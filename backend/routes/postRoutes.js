const express = require("express");
const { authorizeRoles } = require("../middlewares/authMiddleWare");
const {
  createPost,
  getAllPosts,
  getPostsByUser,
  approvePost,
  deletePost,
  editPost,
  rejectPost
} = require("../controllers/postController");
const upload = require("../middlewares/uploadPost");

const router = express.Router();

router.post("/", authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), upload.array("media"), createPost);
router.get("/", authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), getAllPosts);
router.get("/user/:userId", getPostsByUser);
router.patch("/:postId/approve", authorizeRoles(["Admin", "VTManager"]), approvePost);
router.patch("/:postId/reject", authorizeRoles(["Admin", "VTManager"]), rejectPost);
router.patch("/:postId", authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), upload.array("media"), editPost);
router.delete("/:postId", authorizeRoles(["Scholar", "OnboardingBuddy", "VTManager", "Admin"]), deletePost);

module.exports = router;
