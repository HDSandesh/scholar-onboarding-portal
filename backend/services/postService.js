const db = require("../models");

const createPost = async (userId, content, media, tags) => {
  return db.Post.create({ userId, content, media, tags });
};

const getAllPosts = async () => {
  return db.Post.findAll({
    include: {
      model: db.User,
      attributes: ['id','firstName', 'lastName', 'role', 'profilePicture'],
    },
    order: [['updatedAt', 'DESC']],
  });
};

const getPostsByUser = async (userId) => {
  return db.Post.findAll({ where: { userId } });
};

const approvePost = async (postId) => {
  const post = await db.Post.findByPk(postId);
  if (!post) throw new Error("Post not found");

  post.isApproved = true;
  await post.save();
  return post;
};

const deletePost = async (postId, userId, isAdmin) => {
  const post = await db.Post.findByPk(postId);
  if (!post) throw new Error("Post not found");

  if (post.userId !== userId && !isAdmin) throw new Error("Not authorized to delete this post");

  await post.destroy();
};

const editPost = async (postId, userId, updateData, files) => {
  const post = await db.Post.findByPk(postId);
  if (!post) throw new Error("Post not found");

  if (post.userId !== userId) {
    const err = new Error("You are not authorized to edit this post");
    err.status = 403;
    throw err;
  }

  if (updateData.content !== undefined) post.content = updateData.content;
  if (updateData.tags !== undefined) post.tags = JSON.parse(updateData.tags);

  if (files && files.length > 0) {
    const mediaUrls = files.map(file => `/uploads/posts/${file.filename}`);
    post.media = mediaUrls;
  }

  await post.save();
  return post;
};

const rejectPost = async (postId) => {
  const post = await db.Post.findByPk(postId);
  if (!post) throw new Error("Post not found");

  post.isApproved = false;
  await post.save();

  return post;
};


module.exports = { createPost, getAllPosts, getPostsByUser, approvePost, deletePost, editPost, rejectPost };
