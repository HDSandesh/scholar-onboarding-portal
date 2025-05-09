const postService = require("../services/postService");

const createPost = async (req, res) => {
  try {
    const { content, tags } = req.body;
    let tagsArray = [];
    if (tags && typeof tags === "string") {
      tagsArray = tags.split(" ").map(tag => tag.trim()).filter(tag => tag); // Split by spaces and clean up
    }

    // Ensure tags are unique (optional)
    tagsArray = [...new Set(tagsArray)];

    const media = req.files?.map(file => file.filename);
    const post = await postService.createPost(req.user.id, content, media, tagsArray);
    res.status(201).json(post);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await postService.getPostsByUser(userId);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approvePost = async (req, res) => {
  try {
    const post = await postService.approvePost(req.params.postId);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const isAdmin = ["admin", "vt_manager"].includes(req.user.role);
    await postService.deletePost(req.params.postId, req.user.id, isAdmin);
    res.status(204).send();
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

const editPost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const updatedPost = await postService.editPost(postId, userId, req.body, req.files);
    res.json({ message: "Post updated successfully", post: updatedPost });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const rejectPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await postService.rejectPost(postId);
    res.json({ message: "Post rejected successfully", post });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { createPost, getAllPosts, getPostsByUser, approvePost, deletePost, editPost, rejectPost };
