const express = require('express');
const { createUser, activateUser, deactivateUser, bulkCreateUsers, setPassword, getAccounts, updateAccount, updateUserBuddy, deleteUser, exportAccounts, sendMail } = require('../controllers/userController');
const uploadExcel = require('../middlewares/uploadExcel');
const { authorizeRoles } = require('../middlewares/authMiddleWare');

const router = express.Router();

// Only Admins, VT Managers, and Onboarding Buddies can create users
router.post('/', authorizeRoles(['Admin', 'VTManager', 'OnboardingBuddy']), createUser);

// Only Admins, VT Managers, and Onboarding Buddies can create users
router.get("/", authorizeRoles(["Scholar","OnboardingBuddy", "VTManager", "Admin"]), getAccounts);

// Only Admins and VT Managers can activate/deactivate users
router.patch('/activate/:userId', authorizeRoles(['Admin', 'VTManager']), activateUser);
router.patch('/deactivate/:userId', authorizeRoles(['Admin', 'VTManager']), deactivateUser);

// Only Admins, VT Managers, and Onboarding Buddies can bulk-create users
router.post('/bulk-upload', authorizeRoles(['Admin', 'VTManager', 'OnboardingBuddy']), uploadExcel.single('file'), bulkCreateUsers);

// Only Admins, VT Managers, and Onboarding Buddies can bulk-create users
router.put("/:id", authorizeRoles(["OnboardingBuddy", "VTManager", "Admin"]), updateAccount);
router.put('/:id/buddy', authorizeRoles(["OnboardingBuddy", "VTManager", "Admin"]), updateUserBuddy);

// Set Password from Email
router.post('/set-password', setPassword);

router.post('/send-email',authorizeRoles(["OnboardingBuddy", "VTManager", "Admin"]), sendMail);
// Export accounts to Excel
router.get("/export", authorizeRoles(["OnboardingBuddy", "VTManager", "Admin"]), exportAccounts);

// Delete User
router.delete("/:userId", authorizeRoles(["OnboardingBuddy","Admin", "VTManager"]), deleteUser);

module.exports = router;
