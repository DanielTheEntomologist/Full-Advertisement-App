const express = require("express");
const router = express.Router();

const user = require("../controllers/user.controller");
const userValidator = require("../validators/user.validator");

router.post("/auth/register", userValidator.addUser, user.add);
router.post("/auth/login", user.login);

module.exports = router;
