const multer = require("multer");
const path = require("path");

// const path = pathM.resolve();
const maxSize = 1 * 1024 * 1024; // 1MB

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/avatars"); // Specify the directory where files should be stored
  },
  filename: function (req, file, cb) {
    // Generate the file name with its original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

exports.uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
});
