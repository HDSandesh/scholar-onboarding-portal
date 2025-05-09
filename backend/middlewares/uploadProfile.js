const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/profile_pictures/",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, and WEBP images are allowed"), false);
  }
};

const uploadProfile = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter });

module.exports = uploadProfile;
