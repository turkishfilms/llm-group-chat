const mongoose = require("mongoose");

const llmAgentSchema = new mongoose.Schema({
  chatroomId: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    // The name/chatroomId are not unique identifiers. The auto-generated ID is the identifier.
    // Can have multiple agents in same room with same name.
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  personality: {
    type: String,
    required: true,
  },
  responseConditions: {
    type: String,
    required: false,
  },
  talkativeness: {
    type: Number, // Cooldown in seconds to talk again
    required: true,
  },
  model: {
    type: String,
    required: true,
    enum: [
      "llama-3.1-8b-instant",
      "llama-3.3-70b-versatile",
      "deepseek-r1-distill-llama-70b",
    ], // Can add more as needed
  },
  timeCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LlmAgent", llmAgentSchema);
