const express = require('express');
const { createUser, activateUser, deactivateUser, bulkCreateUsers, setPassword } = require('../controllers/userController');
const uploadExcel = require('../middlewares/uploadExcel');
const { authorizeRoles } = require('../middlewares/authMiddleWare');

const router = express.Router();

// Only Admins, VT Managers, and Onboarding Buddies can create users
router.post('/create', authorizeRoles(['admin', 'vt_manager', 'onboarding_buddy']), createUser);

// Only Admins and VT Managers can activate/deactivate users
router.patch('/activate/:userId', authorizeRoles(['admin', 'vt_manager']), activateUser);
router.patch('/deactivate/:userId', authorizeRoles(['admin', 'vt_manager']), deactivateUser);

// Only Admins, VT Managers, and Onboarding Buddies can bulk-create users
router.post('/bulk-upload', authorizeRoles(['admin', 'vt_manager', 'onboarding_buddy']), uploadExcel.single('file'), bulkCreateUsers);

// Set Password from Email
router.post('/set-password', setPassword);

module.exports = router;
