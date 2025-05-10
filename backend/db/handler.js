const mongoose = require("mongoose");
const ChatMessage = require("./models/chatMessage");

require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

const getMessagesByChatroom = async (chatroomId) => {
  return await ChatMessage.find({ chatroomId })
    .sort({ timestamp: 1 })
    .select("username message timestamp -_id"); // explicitly include and exclude fields
};

const saveNewMessage = async ({ chatroomId, username, message }) => {
  const newMessage = new ChatMessage({ chatroomId, username, message });
  return await newMessage.save();
};

module.exports = {
  connectDB,
  getMessagesByChatroom,
  saveNewMessage,
};
