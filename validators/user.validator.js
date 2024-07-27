const { body } = require("express-validator");

/****** VALIDATION ********/
exports.add = [
  body("login").isLength({ min: 3, max: 30 }).trim().escape(),
  body("phone").isLength({ min: 5, max: 50 }).trim().escape(),
  body("avatar").isLength({ min: 5, max: 50 }).trim().escape(),
  body("password").isLength({ min: 5, max: 50 }).trim().escape(),
];

exports.login = [
  body("login").isLength({ min: 3, max: 30 }).trim().escape(),
  body("password").isLength({ min: 5, max: 50 }).trim().escape(),
];
