const User = require("../models/User.model");

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
    res.send("user.add");
  } catch (err) {
    console.log(err);
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
