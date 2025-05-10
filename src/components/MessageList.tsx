import { AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";

export default function MessageList({ messages, listRef, username }) {
  return (
    <div
      ref={listRef}
      className="flex-1 overflow-y-auto space-y-2 pr-2 mb-4 scrollbar-thin scrollbar-thumb-gray-700"
    >
      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <MessageBubble key={msg._id || msg.time} author={msg.username} text={msg.message} username={username} />
        ))}
      </AnimatePresence>
    </div>
  );
}
