const mongoose = require("mongoose");
const ChatMessage = require("./models/chatMessage");
const LlmAgent = require("./models/LlmAgent");

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

// Chat Message handlers
const getMessagesByChatroom = async (chatroomId) => {
  return await ChatMessage.find({ chatroomId })
    .sort({ timestamp: 1 })
    .select("username message timestamp -_id");
};

const getAllChatroomIds = async () => {
  return await ChatMessage.distinct("chatroomId");
};

const saveNewMessage = async ({ chatroomId, username, message, timestamp }) => {
  const newMessage = new ChatMessage({
    chatroomId,
    username,
    message,
    timestamp,
  });
  return await newMessage.save();
};

// LlmAgent handlers
const getAgentsByRoomId = async (chatroomId) => {
  return await LlmAgent.find({ chatroomId });
};

const createNewAgent = async ({
  chatroomId,
  name,
  active,
  personality,
  talkativeness,
  model,
}) => {
  const newAgent = new LlmAgent({
    chatroomId,
    name,
    active,
    personality,
    talkativeness,
    model,
  });
  return await newAgent.save();
};

const updateAgentById = async (id, updates) => {
  return await LlmAgent.findByIdAndUpdate(id, updates, { new: true });
};

module.exports = {
  connectDB,
  getMessagesByChatroom,
  getAllChatroomIds,
  saveNewMessage,
  getAgentsByRoomId,
  createNewAgent,
  updateAgentById,
};
