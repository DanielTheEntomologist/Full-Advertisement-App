const User = require("../models/User.model");

const { body, validationResult } = require("express-validator");

/****** VALIDATION ********/
const bodyValidations = [
  body("login").isLength({ min: 3, max: 30 }).trim().escape(),
  body("phone").isLength({ min: 5, max: 50 }).trim().escape(),
  body("avatar").isLength({ min: 5, max: 50 }).trim().escape(),
  body("password").isLength({ min: 5, max: 50 }).trim().escape(),
];

/****** GET USER ********/
exports.get = async (req, res) => {
  try {
    console.log("user.getUser");
    res.send("user.getUser");
  } catch (err) {
    console.log(err);
    res.status(500).send("problem with getting user");
  }
};

/****** GET ALL USERS ********/
exports.getAll = async (req, res) => {
  try {
    console.log("user.getAll");
    res.send("user.getAll");
  } catch (err) {
    console.log(err);
    res.status(500).send("problem with getting all users");
  }
};

/****** CREATE USER ********/
exports.add = async (req, res) => {
  try {
    console.log("user.add");

    // validate user data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { login, password, avatar, phone } = req.body;

    const newUser = new User({ login, password, avatar, phone });

    await newUser.save();

    res.status(200).send(newUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("problem with adding user");
  }
};

/****** LOGIN USER ********/
exports.login = async (req, res) => {
  try {
    console.log("user.login");
    res.send("user.login");
  } catch (err) {
    console.log(err);
    res.status(500).send("problem with loging in user");
  }
};

/****** REMOVE USER ********/
exports.remove = async (req, res) => {
  try {
    console.log("user.remove");
    res.send("user.remove");
  } catch (err) {
    console.log(err);
    res.status(500).send("problem with removing user");
  }
};
