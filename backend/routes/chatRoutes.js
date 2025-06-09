const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const { authorizeRoles } = require("../middlewares/authMiddleWare");

// Create chat (1-1 or group)
router.post("/",authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), chatController.createChat);

// Get all chats for a user
router.get("/:userId",authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), chatController.getChatsByUser);

// Get a specific chat by ID
router.get("/chat/:chatId",authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), chatController.getChatById);

// Add user to group chat
router.post("/add-participant",authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), chatController.addParticipant);

// Remove user from chat
router.post("/remove-participant",authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), chatController.removeParticipant);

module.exports = router;
