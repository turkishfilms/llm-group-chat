const express = require("express");
const router = express.Router();
const { getChatMessages, postNewMessage } = require("../controllers/chat");

router.get("/chatMessages/:chatroomId", getChatMessages);
router.post("/newMessage", postNewMessage);

module.exports = router;
