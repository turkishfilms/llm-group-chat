import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "./components/ui/button"
import ChatroomIdList from "./ChatroomIdList"

export default function LandingPage({ isActive, setUsername, username, setChatroomId, chatroomId, handleLandingSend }) {
	if (!isActive) return null
	return (
		<>
			<Card className="max-w-screen max-h-screen h-screen border-none rounded-none bg-zinc-700 ">
				<CardContent className="flex flex-col items-center justify-center mt-24">
					<p className="text-white text-[36px]">LLMGC</p>
					<Input
						placeholder="Username"
						className="bg-[#5d5d5d] max-w-50 border-none text-white placeholder:text-neutral-100 mt-8"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					></Input>
					<Input
						placeholder="ChatRoom ID:"
						className="bg-[#5d5d5d] max-w-50 border-none mt-3 text-neutral-100 placeholder:text-white"
						onChange={(e) => setChatroomId(e.target.value)}
						value={chatroomId}
					></Input>
					<Button className="bg-[#3f463f] mt-6" onClick={() => {
						if (username && chatroomId) handleLandingSend()
						else alert("Fill both fields")
					}}>LETS CHAT</Button>
					<ChatroomIdList setChatroomId={setChatroomId}/>
				</CardContent>
			</Card>
			
		</>
	)
}
