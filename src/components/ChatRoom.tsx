import { useEffect, useRef, useState } from "react";
import { useChatContext } from "@/context/ChatContext";
import { Menu, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import MessageForm from "./MessageForm";
import Message from "./Message";
import SystemMessage from "./SystemMessage";
import UsersList from "./UsersList";

export default function ChatRoom() {
  const { messages, users, currentUser, signOut } = useChatContext();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600">Chat Room</h1>
          <span className="ml-2 text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
            {users.length} online
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMobileMenu(true)}
          >
            <Users className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="text-sm text-slate-600 hover:text-slate-900"
            onClick={signOut}
          >
            Sign out
          </Button>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Users Online */}
        <aside className="hidden md:block w-64 bg-white border-r border-slate-200 overflow-y-auto">
          <UsersList users={users} />
        </aside>

        {/* Main Chat Messages */}
        <main className="flex-1 flex flex-col bg-slate-100 overflow-hidden">
          {/* Chat Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 message-container">
            {messages.map((message) => {
              if (message.type === "system") {
                return <SystemMessage key={message.id} text={message.text} />;
              }
              return (
                <Message
                  key={message.id}
                  message={message}
                  isCurrentUser={message.userId === currentUser?.id}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <MessageForm />
        </main>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 bg-slate-950/80">
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-white">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Users</h3>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-500 hover:text-slate-900"
                onClick={() => setShowMobileMenu(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4">
              <UsersList users={users} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
