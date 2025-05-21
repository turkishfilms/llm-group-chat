const {
  getMessagesByChatroom,
  saveNewMessage,
  getAllChatroomIds,
} = require("../db/handler");
const { runLLMAgentTriggers } = require("./llmHandler");

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

const getUniqueChatroomIds = async (req, res) => {
  try {
    const chatroomIds = await getAllChatroomIds();

    if (!chatroomIds || chatroomIds.length === 0) {
      return res.status(404).json({ error: "No chatroomIds found" });
    }

    res.status(200).json({ chatroomIds });
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

    await runLLMAgentTriggers({
      chatroomId,
      username,
      message,
      timestamp: timestamp || Date.now(),
    });

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
  getUniqueChatroomIds,
  postNewMessage,
};
