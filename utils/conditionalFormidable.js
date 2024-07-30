const formidable = require("express-formidable");
const uniqid = require("uniqid");

// Middleware for handling multipart/form-data
exports.uploadFile = (req, res, next) => {
  if (req.headers["content-type"]?.startsWith("multipart/form-data")) {
    formidable({ uploadDir: "./public/uploads/" }, [
      {
        event: "fileBegin", // on every file upload...
        action: (req, res, next, name, file) => {
          const fileName = uniqid() + "." + file.name.split(".")[1];
          file.path = __dirname + "/public/uploads/photo_" + fileName; // ...move the file to public/uploads with unique name
        },
      },
    ])(req, res, next);
  } else {
    next();
  }
};
