const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  chatroomId: {
    type: String,
    required: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LlmAgent",
    default: null, // null for human messages, agent ID for LLMs
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
