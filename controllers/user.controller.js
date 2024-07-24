const User = require("../models/User.model");
const bcrypt = require("bcrypt");

const { validationResult } = require("express-validator");

/****** GET USER ********/
exports.get = async (req, res) => {
  try {
    console.log("user.getUser");
    res.send("user.getUser");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with getting user" });
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
      console.log(errors);
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { login, password, avatar, phone } = req.body;

    const existingUser = await User.findOne({ login: login });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      login,
      password: hashedPassword,
      avatar,
      phone,
      salt,
    });

    await newUser.save();

    // return new user while hiding password and salt
    newUser.password = undefined;
    newUser.salt = undefined;
    res.status(200).send(newUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "problem with adding user" });
  }
};

/****** LOGIN USER ********/
exports.login = async (req, res) => {
  try {
    console.log("user.login");
    res.send("user.login");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with loging in user" });
  }
};

/****** REMOVE USER ********/
exports.remove = async (req, res) => {
  try {
    console.log("user.remove");
    res.send("user.remove");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with removing user" });
  }
};
