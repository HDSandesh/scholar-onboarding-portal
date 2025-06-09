const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// Get messages for a chat
router.get("/:chatId", messageController.getMessagesByChat);

module.exports = router;
