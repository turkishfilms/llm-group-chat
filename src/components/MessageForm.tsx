import { useState } from "react";
import { Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatContext } from "@/context/ChatContext";

export default function MessageForm() {
  const [message, setMessage] = useState("");
  const { sendMessage } = useChatContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    
    sendMessage(trimmedMessage);
    setMessage("");
  };

  return (
    <div className="bg-white border-t border-slate-200 p-4">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="flex-1 relative">
          <Input 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..." 
            className="w-full px-4 py-2 pr-10 border border-slate-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <Button 
            type="button" 
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-primary-500"
          >
            <Smile className="h-5 w-5" />
          </Button>
        </div>
        <Button 
          type="submit" 
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md flex items-center transition-colors"
        >
          <Send className="h-5 w-5" />
          <span className="ml-1 hidden sm:inline">Send</span>
        </Button>
      </form>
    </div>
  );
}
