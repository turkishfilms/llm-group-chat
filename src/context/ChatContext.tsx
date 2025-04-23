import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { getInitials } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export type ChatUser = {
  id: number;
  username: string;
  displayName: string;
  initials: string;
  status: "online" | "away";
};

export interface ChatMessage {
  id: number;
  type: "user" | "system";
  text: string;
  userId?: number;
  user?: ChatUser;
  timestamp: string | Date;
}

interface SignInData {
  username: string;
}

interface ChatContextType {
  currentUser: ChatUser | null;
  users: ChatUser[];
  messages: ChatMessage[];
  isConnected: boolean;
  signIn: (data: SignInData) => void;
  signOut: () => void;
  sendMessage: (text: string) => void;
  connectToChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<ChatUser | null>(null);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socket = useRef<WebSocket | null>(null);
  const { toast } = useToast();

  // Connect to WebSocket
  const connectToChat = useCallback(() => {
    if (!currentUser || socket.current) return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    const ws = new WebSocket(wsUrl);
    socket.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      toast({
        title: "Connected to chat",
        description: "You are now connected to the chat room",
      });
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === "users") {
        setUsers(data.users);
      } else if (data.type === "message") {
        setMessages(prev => [...prev, data.message]);
      } else if (data.type === "history") {
        setMessages(data.messages);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      socket.current = null;
      toast({
        title: "Disconnected from chat",
        description: "Connection to chat server lost",
        variant: "destructive",
      });
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      toast({
        title: "Connection error",
        description: "Failed to connect to chat server",
        variant: "destructive",
      });
    };

    // Send identification message
    ws.addEventListener("open", () => {
      if (currentUser) {
        ws.send(JSON.stringify({
          type: "identify",
          user: currentUser,
        }));
      }
    });

    return () => {
      ws.close();
    };
  }, [currentUser, toast]);

  // Effect to reconnect if connection is lost
  useEffect(() => {
    if (currentUser && !socket.current) {
      connectToChat();
    }
  }, [currentUser, connectToChat]);

  // User ID counter for local use
  const userIdCounter = useRef(1);

  // Sign in function - simplified without backend authentication
  const signIn = async (data: SignInData) => {
    try {
      // Create a new user with just the username
      const user: ChatUser = {
        id: userIdCounter.current++,
        username: data.username,
        displayName: data.username,
        initials: getInitials(data.username),
        status: "online",
      };
      
      console.log("Signing in with user:", user);
      setCurrentUser(user);
      
      // Add to local messages
      setMessages([
        {
          id: Date.now(),
          type: "system",
          text: `You joined the chat as ${user.username}`,
          timestamp: new Date(),
        },
      ]);
      
      toast({
        title: "Signed in successfully",
        description: `Welcome to the chat, ${user.username}!`,
      });
    } catch (error) {
      console.error("Sign in error:", error);
      toast({
        title: "Sign in failed",
        description: "Could not sign in. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Sign out function - simplified without backend calls
  const signOut = useCallback(() => {
    if (socket.current) {
      socket.current.close();
      socket.current = null;
    }
    
    setCurrentUser(null);
    setMessages([]);
    setUsers([]);
    setIsConnected(false);
    
    toast({
      title: "Signed out",
      description: "You have been signed out of the chat room",
    });
  }, [toast]);

  // Send message function - with local state update
  const sendMessage = useCallback((text: string) => {
    if (!currentUser) {
      toast({
        title: "Cannot send message",
        description: "You are not signed in",
        variant: "destructive",
      });
      return;
    }
    
    // Immediately add message to local state for instant feedback
    const newMessage: ChatMessage = {
      id: Date.now(),
      type: "user",
      text,
      userId: currentUser.id,
      user: currentUser,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // If connected to WebSocket, send the message there as well
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify({
        type: "message",
        message: {
          text,
          userId: currentUser.id,
          user: currentUser,
        },
      }));
    }
  }, [currentUser, toast]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  return (
    <ChatContext.Provider value={{
      currentUser,
      users,
      messages,
      isConnected,
      signIn,
      signOut,
      sendMessage,
      connectToChat,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
