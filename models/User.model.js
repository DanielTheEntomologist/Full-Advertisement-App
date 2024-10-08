const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: false },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  salt: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
