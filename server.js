const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
// const { conditionalFormidable } = require("./utils/conditionalFormidable");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectToDB = require("./db");

// start express server
const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running...");
});

// connect to DB
connectToDB();

// add middleware
app.use(cors());
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: MongoStore.create(mongoose.connection),
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(conditionalFormidable);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/public")));

// app.use(express.static(path.join(__dirname, "/client/build")));

// add photo routes
app.use("/api", require("./routes/auth.routes"));
app.use("/api", require("./routes/user.routes"));
app.use("/api", require("./routes/ad.routes"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use((req, res) => {
  res.status(404).send({ message: "Not found..." });
});
