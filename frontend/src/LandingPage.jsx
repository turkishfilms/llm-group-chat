
//imports
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function LandingPage() {

	return (
		<>
			<div >
				<Card className="max-w-screen max-h-screen h-screen bg-blue-500 text-black-500">
					<CardContent className="flex items-center justify-center ">
						<Input placeHolder="Username" className="bg-orange-200 max-w-50"></Input>
						<Input placeHolder="ChatRoom ID:" className="bg-orange-200 max-w-100"></Input>
					</CardContent>
				</Card>

			</div>
		</>

	)
}
