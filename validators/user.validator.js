const { body } = require("express-validator");

const getImageFileType = require("../utils/getImageFileType");

/****** VALIDATION ********/
exports.add = [
  body("login").isLength({ min: 3, max: 30 }).trim().escape(),
  body("phone").isLength({ min: 5, max: 50 }).trim().escape(),
  // body("avatar").isLength({ min: 5, max: 50 }).trim().escape(),
  // custom function that checks avatar file type
  body("avatar").custom(async (value, { req }) => {
    if (req.file) {
      const allowedExtensions = ["png", "jpg", "jpeg", "gif"];
      const extension = req.file.originalname.split(".").pop();
      if (!allowedExtensions.includes(extension)) {
        throw new Error("Invalid file type");
      }
      const imageTypeHeader = await getImageFileType(req.file);
      if (imageTypeHeader === "unknown") {
        throw new Error("Invalid file type");
      }
    }
    return true;
  }, "Invalid file type"),
  body("password").isLength({ min: 5, max: 50 }).trim().escape(),
];

exports.login = [
  body("login").isLength({ min: 3, max: 30 }).trim().escape(),
  body("password").isLength({ min: 5, max: 50 }).trim().escape(),
];
