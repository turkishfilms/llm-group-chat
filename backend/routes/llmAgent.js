const express = require("express");
const router = express.Router();
const {
  getAgents,
  postNewAgent,
  editAgent,
} = require("../controllers/llmAgent");

router.get("/agentsByChatroomId/:chatroomId", getAgents);

router.post("/createNewAgent", postNewAgent);

router.post("/editAgent", editAgent);

module.exports = router;
