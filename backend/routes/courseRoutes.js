const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { authorizeRoles } = require("../middlewares/authMiddleWare");
const { upload } = require("../middlewares/uploadThumbnail");

// CRUD Routes
router.post("/",authorizeRoles(["OnboardingBuddy", "VTManager", "Admin"]),upload.single("thumbnail"), courseController.create);
router.get("/", authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), courseController.getAll);
router.get("/:id", authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), courseController.getById);
router.put("/:id", authorizeRoles(["OnboardingBuddy", "VTManager", "Admin"]), upload.single("thumbnail"), courseController.update);
router.delete("/:id", authorizeRoles(["OnboardingBuddy", "VTManager", "Admin"]), courseController.remove);

// Mark as completed
router.post("/:courseId/complete", courseController.markCompleted);

module.exports = router;
