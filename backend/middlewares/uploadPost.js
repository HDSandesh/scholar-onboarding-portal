const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/posts/",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/mkv"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, WEBP images and MP4, MKV videos are allowed"), false);
  }
};

const uploadPost = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 }, fileFilter }); // 10MB limit

module.exports = uploadPost;
