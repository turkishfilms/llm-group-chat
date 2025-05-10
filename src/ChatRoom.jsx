import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardContent } from "./components/ui/card";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";

export default function ChatRoom() {
	const [messages, setMessages] = useState([
		{ id: 0, author: "System", text: "Welcome to the chat!" },
	]);
	const [draft, setDraft] = useState("");
	const [username, setUsername] = useState("Farquad");
	const listRef = useRef(null);

	const handleSend = () => {
		if (!draft.trim()) return;
		setMessages((prev) => [
			...prev,
			{ id: Date.now(), author: username, text: draft.trim() },
		]);
		setDraft("");
	};

	useEffect(() => {
		if (listRef.current) {
			listRef.current.scrollTop = listRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-600 text-gray-50 p-4">
			<Card className="w-full max-w-screen h-[80vh] flex flex-col shadow-lg rounded-2xl">
				<CardHeader className="text-xl font-semibold">ChatRoom</CardHeader>
				<CardContent className="flex-1 overflow-hidden flex flex-col">
					<MessageList messages={messages} listRef={listRef} />
					<MessageInput
						draft={draft}
						setDraft={setDraft}
						handleSend={handleSend}
					/>
				</CardContent>
			</Card>
		</div>
	);
}

