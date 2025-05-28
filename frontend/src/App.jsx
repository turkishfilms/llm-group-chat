import { useState } from 'react'
import ChatRoom from './ChatRoom.jsx'
import LandingPage from './LandingPage.jsx'
export default function App() {

  const [shownPage, setShownPage] = useState("LandingPage")	//Landing or Chatroom
  const [username, setUsername] = useState("")		//Current Username
  const [chatroomId, setChatroomId] = useState("")					//Current ChatRoomId

  const handleLandingSend = () => {
    setShownPage("Chatroom")
  }

  const backToLanding = () => {
    setShownPage("LandingPage")
  }

  return (
    <>
      <LandingPage setUsername={setUsername} setChatroomId={setChatroomId} handleLandingSend={handleLandingSend} username={username ? username : null} chatroomId={chatroomId ? chatroomId : null} isActive={shownPage == "LandingPage"} ></LandingPage>
      <ChatRoom backToLanding={backToLanding} chatroomId={chatroomId} username={username} isActive={shownPage == "Chatroom"}></ChatRoom>
    </>
  )
}

