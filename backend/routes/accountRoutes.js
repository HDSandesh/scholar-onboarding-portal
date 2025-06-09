const express = require("express");
const router = express.Router();
const {createAccount, getAccounts, importAccounts, exportAccounts, updateAccount, toggleAccountStatus} = require("../controllers/accountsController");
const upload = require("../middlewares/uploadExcel");
const { authorizeRoles } = require("../middlewares/authMiddleWare");

// Create account
router.post("/", authorizeRoles(["OnboardingBuddy", "VTManager", "Admin"]), createAccount);

// Get accounts with optional role filter (scholar, buddy, admin, hr)
router.get("/", authorizeRoles(["OnboardingBuddy", "VTManager", "Admin"]), getAccounts);

// Import accounts from Excel
router.post("/import", authorizeRoles(["OnboardingBuddy", "VTManager", "Admin"]), upload.single("file"), importAccounts);

// Export accounts to Excel
router.get("/export", authorizeRoles(["OnboardingBuddy", "VTManager", "Admin"]), exportAccounts);

// Edit account
router.put("/:id", authorizeRoles(["OnboardingBuddy", "VTManager", "Admin"]), updateAccount);

// Activate / Deactivate account
router.patch("/:id/toggle-status", authorizeRoles(["OnboardingBuddy", "VTManager", "Admin"]), toggleAccountStatus);

module.exports = router;
