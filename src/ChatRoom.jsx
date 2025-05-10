import { useState, useRef, useEffect } from "react"
import { Card, CardHeader, CardContent } from "./components/ui/card"
import MessageList from "./components/MessageList"
import MessageInput from "./components/MessageInput"

export default function ChatRoom() {

	const [draft, setDraft] = useState("")							//Current message being typed
	const [username, setUsername] = useState("Turkishfilms")		//Current Username
	const [chatroomId, setChatroomId] = useState(1)					//Current ChatRoomId
	const listRef = useRef(null)									//Connection to Chat list DOM element
	const [messages, setMessages] = useState([{						//Messages are {time, username, message}
		time: 0,
		username: "System",
		message: "Welcome to the chat!",
		chatroomId: chatroomId,
	},])


	const getNonDuplicateMessages = (serverMessages, clientMessages) => {
		const currentIds = new Set(clientMessages.map(msg => msg.time))
		const newMessages = serverMessages.filter(msg => !currentIds.has(msg.time))
		return newMessages
	}

	const addMessagesToChat = (newMessages) => {
		setMessages((current) => [...current, ...getNonDuplicateMessages(newMessages, current)])
	}

	const fetchMessagesFromServer = async () => {
		const res = await fetch(`/chatMessages/${chatroomId}`)
		const serverMessages = await res.json()
		addMessagesToChat(serverMessages.chatMessages)
	}

	const sendMessageToServer = (message) => {
		fetch('/newMessage', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				time: Date.now(),
				message: message,
				chatroomId: chatroomId
			})
		})
	}

	const handleSend = () => {
		const message = draft.trim()
		if (!message) return		//if no draft no send
		setMessages((prev) => [
			...prev,
			{ time: Date.now(), username: username, message: message, chatRoomId: chatroomId },
		])
		setDraft("")
		sendMessageToServer(message)
	}

	const FIVE_SECONDS = 5 * 1000
	useEffect(() => {
		const interval = setInterval(() => {	//fetch messages every five seconds
			fetchMessagesFromServer()
		}, FIVE_SECONDS)

		return () => clearInterval(interval)	//clean up on unmount
	}, [])

	useEffect(() => {							//Always scroll to bottom of chat on new message
		if (listRef.current) {
			listRef.current.scrollTop = listRef.current.scrollHeight
		}
	}, [messages])

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-600 text-gray-50 p-4">
			<Card className="w-full max-w-screen h-[80vh] flex flex-col shadow-lg rounded-2xl">
				<CardHeader className="text-xl font-semibold">ChatRoom</CardHeader>
				<CardContent className="flex-1 overflow-hidden flex flex-col">
					<MessageList messages={messages} listRef={listRef} username={username} />
					<MessageInput
						draft={draft}
						setDraft={setDraft}
						handleSend={handleSend}
					/>
				</CardContent>
			</Card>
		</div>
	)
}

