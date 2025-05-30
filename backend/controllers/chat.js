const { getMessagesByChatroom, saveNewMessage } = require("../db/handler");
const getLLMResponse = require("./llmResponse");

const getChatMessages = async (req, res) => {
  try {
    const { chatroomId } = req.params;
    const chatMessages = await getMessagesByChatroom(chatroomId);

    if (chatMessages.length === 0) {
      return res
        .status(404)
        .json({ error: "No messages found for this chatroomId" });
    }

    res.status(200).json({ chatMessages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const postNewMessage = async (req, res) => {
  try {
    const { chatroomId, username, message, timestamp } = req.body;

    if (!chatroomId || !username || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newChatMessage = await saveNewMessage({
      chatroomId,
      username,
      message,
      timestamp,
    });

    //this is where the function could be to send chat to llm for response, which once received gets posted
    // as newChatMessage to save to db
    const chatLog = await getMessagesByChatroom(chatroomId);

    const aiReply = await getLLMResponse({
      personality:
        "maintain peace and mediate the conversation pointing out logical fallacies",
      chatlog: chatLog,
    });

    if (aiReply && aiReply.trim() !== "No response needed") {
      await saveNewMessage({
        chatroomId,
        username: "AI",
        message: aiReply,
        timestamp: Date.now(),
      });
    }

    res
      .status(201)
      .json({ message: "Chat message saved", chatMessage: newChatMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getChatMessages,
  postNewMessage,
};
