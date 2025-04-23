import ChatRoom from "@/components/ChatRoom";
import { useChatContext } from "@/context/ChatContext";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ChatPage() {
  const { connectToChat, isConnected } = useChatContext();
  const { toast } = useToast();

  useEffect(() => {
    // Connect to chat when component mounts
    connectToChat();

    // Show connection status
    if (!isConnected) {
      toast({
        title: "Connecting to chat...",
        description: "Please wait while we connect you to the chat server.",
      });
    }
  }, [connectToChat, isConnected, toast]);

  return <ChatRoom />;
}
