const express = require("express");
const router = express.Router();
const {
  getChatMessages,
  postNewMessage,
  getUniqueChatroomIds,
} = require("../controllers/chat");

router.get("/chatMessages/:chatroomId", getChatMessages);
router.get("/uniqueChatroomIds", getUniqueChatroomIds);
router.post("/newMessage", postNewMessage);

module.exports = router;
