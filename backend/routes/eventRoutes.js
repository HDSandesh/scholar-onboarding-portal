const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { authorizeRoles } = require("../middlewares/authMiddleWare");
const { upload } = require("../middlewares/uploadThumbnail");

router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);


// CRUD Routes
router.post("/",authorizeRoles(["OnboardingBuddy", "VTManager", "Admin"]),upload.single("thumbnail"), eventController.createEvent);
router.get("/", authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), eventController.getAllEvents);
router.get("/:id", authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), eventController.getEventById);
router.put("/:id", authorizeRoles(["OnboardingBuddy", "VTManager", "Admin"]), upload.single("thumbnail"), eventController.updateEvent);
router.delete("/:id", authorizeRoles(["OnboardingBuddy", "VTManager", "Admin"]), eventController.deleteEvent);

module.exports = router;
