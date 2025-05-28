import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

export default function MessageInput({ draft, setDraft, handleSend }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-2">
      <Input
        placeholder="Type a message..."
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="rounded-2xl"
      />
      <Button onClick={handleSend} className="rounded-2xl" size="icon">
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
}
