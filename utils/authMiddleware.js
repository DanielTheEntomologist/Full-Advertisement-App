const User = require("../models/User.model");

exports.isAuthorised = async (req, res, next) => {
  try {
    // const user = await User.findOne({ _id: req.session.user._id });

    if (req.session.user /*&& user*/) {
      next();
    } else {
      res.status(404).json({ message: "Not authorised" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem checking authorisation" });
  }
};
