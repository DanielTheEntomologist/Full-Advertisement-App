const Session = require("../models/Session.model");

exports.isAuthorised = async (req, res, next) => {
  try {
    // const user = await User.findOne({ _id: req.session.user._id });

    if (process.env.NODE_ENV !== "production") {
      try {
        // find last session record in db
        const sessionRecord = await Session.findOne({});

        // if session is not found
        // return 401 status and message
        if (!sessionRecord)
          return res.status(401).send({ message: "You are not authorized" });

        // if session is found, parse it and set user in req.session
        const sessionData = JSON.parse(sessionRecord.session);
        req.session.user = {
          ...sessionData.user,
        };
        next();
      } catch (err) {
        return res.status(401).send({ message: "You are not authorized" });
      }
    } else if (req.session.user /*&& user*/) {
      next();
    } else {
      res.status(401).json({ message: "You are not authorized" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem checking authorisation" });
  }
};
