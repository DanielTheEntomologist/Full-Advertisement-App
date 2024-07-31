const { body, validationResult } = require("express-validator");

const getImageFileType = require("../utils/getImageFileType");

const displayErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

/****** VALIDATIONS ********/
const onlyExpectedFields = [
  body()
    .custom((body) => {
      const keys = [
        "title",
        "content",
        "date",
        "image",
        "price",
        "location",
        "seller",
      ];
      return Object.keys(body).every((key) => keys.includes(key));
    })
    .withMessage("Some extra parameters are sent"),
];

const validations = [
  body("title").isLength({ min: 3, max: 50 }).trim().escape(),
  body("content").isLength({ min: 20, max: 1000 }).trim().escape(),
  body("date").isDate(),
  body("image").custom(async (value, { req }) => {
    if (req.file) {
      const allowedExtensions = ["png", "jpg", "jpeg", "gif"];
      const extension = req.file.originalname.split(".").pop();
      if (!allowedExtensions.includes(extension)) {
        throw new Error("Invalid file type");
      }
      const imageTypeHeader = await getImageFileType(req.file);
      if (imageTypeHeader === "unknown") {
        throw new Error("Invalid file type");
      }
    }
    return true;
  }, "Invalid file type"),
  body("price").isNumeric(),
  body("location").isLength({ min: 0, max: 200 }).trim().escape(),
  body("seller").isLength({ min: 1, max: 200 }).trim().escape(),
];

const allRequiredValidations = [
  body("title").notEmpty(),
  body("content").notEmpty(),
  body("date").notEmpty(),

  body("image").custom(async (value, { req }) => {
    if (!req.file) {
      throw new Error("Missing image file");
    }
    return true;
  }, "Missing image file"),

  body("price").notEmpty(),
  body("location").notEmpty(),
  body("seller").notEmpty(),
];

exports.add = [...allRequiredValidations, ...validations, displayErrors];

exports.update = [...validations, displayErrors];
