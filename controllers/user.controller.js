const User = require("../models/User.model");
const Session = require("../models/Session.model");
const bcrypt = require("bcrypt");

const { validationResult } = require("express-validator");

const { unlink } = require("node:fs/promises");

const deleteFile = async function (path) {
  try {
    await unlink(path);
    // console.log(`successfully deleted ${path}`);
  } catch (error) {
    console.error("there was an error:", error.message);
  }
};

/****** GET USER ********/
exports.get = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with getting user" });
  }
};

/****** GET ALL USERS ********/
exports.getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("problem with getting all users");
  }
};

/****** CREATE USER ********/
exports.add = async (req, res) => {
  try {
    // validate user data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { login, password, phone } = req.body;
    const avatar = req.file ? req.file.path : "";

    // console.log("avatar", avatar);

    const existingUser = await User.findOne({ login: login });
    if (existingUser) {
      // if user exists, delete uploaded avatar
      if (avatar) await deleteFile(avatar);
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
    const { login, password } = req.body;

    const user = await User.findOne({ login: login });

    if (!user) {
      console.log("user not found");
      res.status(404).json({ message: "Incorrect Credentials" });
      return;
    }

    // const hashedPassword = await bcrypt.hash(password, user.salt);
    // const isValidPassword =  hashedPassword === user.password;
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      console.log("incorrect password");
      res.status(404).json({ message: "Incorrect Credentials" });
      return;
    }

    req.session.user = user;
    res.json({ message: "Login Succesful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with logging in user" });
  }
};

/****** REMOVE USER ********/
exports.remove = async (req, res) => {
  try {
    // mongodb remove user
    const user = await User.deleteOne({ _id: req.session.user._id });
    console.log("user.remove", user);
    // remove session record
    if (process.env.NODE_ENV !== "production") await Session.deleteMany({});
    req.session.destroy();

    await deleteFile(req.session.user.avatar);

    res.status(200).send({
      message: "User " + req.session.user.login + " removed and logged out",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with removing user" });
  }
};

/****** CURRENT USER ********/
exports.current = async (req, res) => {
  try {
    console.log("user.current", req.session.user);
    res.json({ message: "Current user is: " + req.session.user.login });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with getting current user" });
  }
};

/****** LOGOUT USER ********/
const logout = async (req, res) => {
  try {
    if (process.env.NODE_ENV !== "production") await Session.deleteMany({});

    req.session.destroy();
    res.json({ message: "Logged out" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with logging out user" });
  }
};

exports.logout = logout;
