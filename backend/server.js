const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ChatMessage = require("./db/models/ChatMessage");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());

const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/chatMessages/:chatroomId", async (req, res) => {
  try {
    const { chatroomId } = req.params;

    const chatMessages = await ChatMessage.find({ chatroomId }).sort({
      timestamp: 1,
    });

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
});

app.post("/newMessage", async (req, res) => {
  try {
    const { chatroomId, username, message } = req.body;

    if (!chatroomId || !username || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newChatMessage = new ChatMessage({
      chatroomId,
      username,
      message,
    });

    await newChatMessage.save();

    res
      .status(201)
      .json({ message: "Chat message saved", chatMessage: newChatMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
