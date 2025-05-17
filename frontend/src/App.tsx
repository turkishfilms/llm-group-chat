import { useState } from 'react'
import ChatRoom from './ChatRoom.jsx'
import LandingPage from './LandingPage.jsx'
export default function App() {


  const [shownPage, setShownPage] = useState("LandingPage")	//Landing or Chatroom
  const [username, setUsername] = useState("Turkishfilms")		//Current Username
  const [chatroomId, setChatroomId] = useState(1)					//Current ChatRoomId

  const handleLandingSend = () => {
    setShownPage("Chatroom")
  }

  return (
    <>
      <LandingPage setUsername={setUsername} setChatroomId={setChatroomId} handleLandingSend={handleLandingSend} isActive={shownPage == "LandingPage"} ></LandingPage>
      <ChatRoom chatroomId={chatroomId} username={username} isActive={shownPage == "Chatroom"}></ChatRoom>
    </>
  )
}

