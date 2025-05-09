const multer = require("multer");

const storage = multer.memoryStorage(); // Store in memory for quick parsing

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
      file.mimetype === "text/csv") {
    cb(null, true);
  } else {
    cb(new Error("Only .xlsx and .csv files are allowed"), false);
  }
};

const uploadExcel = multer({ storage, fileFilter });

module.exports = uploadExcel;
