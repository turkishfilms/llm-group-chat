import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardContent } from "./components/ui/card";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import { Button } from "./components/ui/button";

export default function ChatRoom({
  chatroomId,
  username,
  isActive,
  backToLanding,
}) {
  const [draft, setDraft] = useState(""); //Current message being typed
  const listRef = useRef(null); //Connection to Chat list DOM element
  const [messages, setMessages] = useState([]);
  const messageRef = useRef(messages); //Connection to messages

  const getNonDuplicateMessages = (serverMessages, clientMessages) => {
    const currentIds = new Set(clientMessages.map((msg) => msg.timestamp));
    const newMessages = serverMessages.filter(
      (msg) => !currentIds.has(msg.timestamp)
    );
    return newMessages;
  };

  const handleServerMessages = (newMessages) => {
    const newMessagesDateNormal = newMessages.map((msg) => ({
      ...msg,
      timestamp: new Date(msg.timestamp).getTime(),
    }));
    const uniques = getNonDuplicateMessages(
      newMessagesDateNormal,
      messageRef.current
    );

    if (uniques.length == 0) return;
    addMessagesToChat(uniques);
  };

  const addMessagesToChat = (messages) => {
    setMessages((current) => {
      return [...current, ...messages];
    });
  };

  const fetchMessagesFromServer = async () => {
    const res = await fetch(`/chatMessages/${chatroomId}`);
    const serverMessages = await res.json();
    handleServerMessages(serverMessages.chatMessages);
  };

  const sendMessageToServer = (message, date) => {
    fetch("/newMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        message: message,
        timestamp: date,
        chatroomId: chatroomId,
      }),
    });
  };

  const handleSend = () => {
    const message = draft.trim();
    if (!message) return; //if no draft no send
    const date = Date.now();
    addMessagesToChat([
      {
        username: username,
        message: message,
        timestamp: date,
        chatroomId: chatroomId,
      },
    ]);
    setDraft("");
    sendMessageToServer(message, date);
  };

  const FIVE_SECONDS = 5 * 1000;
  useEffect(() => {
    // Reset messages when chatroom changes
    if (!isActive) return; //since it doesnt unmount and always stays on this must be here
    setMessages([
      {
        username: "System",
        message: "Welcome to the chat!",
        timestamp: Date.now(),
        chatroomId,
      },
    ]);

    // Fetch immediately for current chatroom
    fetchMessagesFromServer();

    // Then set up polling
    const interval = setInterval(fetchMessagesFromServer, FIVE_SECONDS);

    // Clean up on chatroomId change or unmount
    return () => clearInterval(interval);
  }, [chatroomId]);

  useEffect(() => {
    //Always scroll to bottom of chat on new message
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
    messageRef.current = messages;
  }, [messages]);

  if (!isActive) return null;

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center bg-gray-600 text-gray-50 p-4">
        <Button
          className="absolute top-4 left-4 bg-neutral-200 hover:bg-neutral-500 text-black"
          onClick={backToLanding}
        >
          Back To Landing
        </Button>
        <Card className="w-full max-w-screen h-[80vh] flex flex-col shadow-lg rounded-2xl">
          <CardHeader className="text-xl font-semibold">ChatRoom</CardHeader>
          <CardContent className="flex-1 overflow-hidden flex flex-col">
            <MessageList
              messages={messages}
              listRef={listRef}
              username={username}
            />
            <MessageInput
              draft={draft}
              setDraft={setDraft}
              handleSend={handleSend}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
