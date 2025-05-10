
import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Basic React chatroom component.
 * Keeps messages in local state; ready to wire up to WebSockets or REST later.
 */
export default function ChatRoom() {
	const [messages, setMessages] = useState([
		{ id: 0, author: "System", text: "Welcome to the chat!" },
	]);
	const [draft, setDraft] = useState("");

	const listRef = useRef(null); // ✅ works in `.jsx`
	const handleSend = () => {
		if (!draft.trim()) return;
		setMessages((prev) => [
			...prev,
			{ id: Date.now(), author: "You", text: draft.trim() },
		]);
		setDraft("");
	};

	useEffect(() => {
		// scroll to bottom on new messages
		if (listRef.current) {
			listRef.current.scrollTop = listRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-50 p-4">
			<Card className="w-full max-w-xl h-[70vh] flex flex-col shadow-lg rounded-2xl">
				<CardHeader className="text-xl font-semibold">ChatRoom</CardHeader>
				<CardContent className="flex-1 overflow-hidden flex flex-col">
					{/* Message list */}
					<div
						ref={listRef}
						className="flex-1 overflow-y-auto space-y-2 pr-2 mb-4 scrollbar-thin scrollbar-thumb-gray-700"
					>
						<AnimatePresence initial={false}>
							{messages.map((msg) => (
								<motion.div
									key={msg.id}
									initial={{ opacity: 0, translateY: 10 }}
									animate={{ opacity: 1, translateY: 0 }}
									exit={{ opacity: 0, translateY: -10 }}
									transition={{ duration: 0.2 }}
									className={`max-w-[80%] px-4 py-2 rounded-2xl shadow bg-gray-800 ${msg.author === "You" ? "self-end bg-blue-600 text-white" : "self-start bg-gray-800 text-gray-100"
										}`}
								>
									{msg.text}
								</motion.div>
							))}
						</AnimatePresence>
					</div>

					{/* Input */}
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
				</CardContent>
			</Card>
		</div>
	);
}
