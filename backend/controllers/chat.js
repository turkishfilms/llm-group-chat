///pulls functions from db handler to build functionality to be forwarded to routes
const { getMessagesByChatroom, saveNewMessage } = require("../db/handler");

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
    const { chatroomId, username, message /*, isHuman*/ } = req.body;

    if (!chatroomId || !username || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newChatMessage = await saveNewMessage({
      chatroomId,
      username,
      message,
    });

    res
      .status(201)
      .json({ message: "Chat message saved", chatMessage: newChatMessage });
    //this is where the function could be to send chat to llm for response, which once received gets posted
    // as postNewMessage (needs to know if human or ai posting to prevent infinite ai loop)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getChatMessages,
  postNewMessage,
};
