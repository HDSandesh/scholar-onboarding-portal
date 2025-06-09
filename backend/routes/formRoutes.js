const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");
const { authorizeRoles } = require("../middlewares/authMiddleWare");

router.post("/", authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), formController.createForm);
router.post("/:id/submit", authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), formController.submitFormResponse);
router.get("/", authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), formController.getForms);
router.get("/:id", authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), formController.getForm);
router.put("/:id", authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), formController.updateForm);
router.patch("/:id/toggle-active", authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), formController.toggleFormActiveStatus);
router.delete("/:id", authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), formController.deleteForm);
router.get("/:id/summary", authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), formController.getFormSummary); // Question-wise summary
router.get("/:id/responses", authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), formController.getFormResponses); // List of responses
router.get("/user/:userId", authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), formController.getFormsByUserAndStatus);

module.exports = router;
