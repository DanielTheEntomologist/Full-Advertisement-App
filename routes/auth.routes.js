const express = require("express");
const router = express.Router();

const user = require("../controllers/user.controller");
const userValidator = require("../validators/user.validator");
const authMiddleware = require("../utils/authMiddleware");
const uploadImage = require("../utils/uploadImage");
const filterResponse = require("../utils/filterResponse.js");

router.post(
  "/auth/register",
  uploadImage.uploadFile.single("avatar"),
  userValidator.add,
  user.add
);
router.post(
  "/auth/login",
  userValidator.login,
  filterResponse.filterCredentials,
  user.login
);

router.get(
  "/auth/user",
  authMiddleware.isAuthorised,
  filterResponse.filterCredentials,
  user.current
);
router.delete("/auth/logout", authMiddleware.isAuthorised, user.logout);
router.delete("/auth/remove", authMiddleware.isAuthorised, user.remove);

module.exports = router;
