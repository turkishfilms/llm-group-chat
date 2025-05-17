import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "./components/ui/button"

export default function LandingPage({ setUsername, setChatroomId, handleLandingSend }) {

	return (
		<>
			<Card className="max-w-screen max-h-screen h-screen bg-blue-500 text-black-500">
				<p>LLMGC</p>
				<CardContent className="flex items-center justify-center ">
					<Input
						placeholder="Username"
						className="bg-orange-200 max-w-50"
						onChange={(e) => setUsername(e.target.value)}
					></Input>
					<Input
						placeholder="ChatRoom ID:"
						className="bg-orange-200 max-w-100"
						onChange={(e) => setChatroomId(e.target.value)}
					></Input>
					<Button onClick={handleLandingSend}></Button>
				</CardContent>
			</Card>
		</>

	)
}
