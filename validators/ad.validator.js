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
        "locationCoords",
        "seller",
      ];
      return Object.keys(body).every((key) => keys.includes(key));
    })
    .withMessage("Some extra parameters are sent"),
];

const validations = [
  body("title").optional().isLength({ min: 3, max: 50 }).trim().escape(),
  body("content").optional().isLength({ min: 20, max: 1000 }).trim().escape(),
  body("date").optional().isDate(),
  body("image")
    .optional()
    .custom(async (value, { req }) => {
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
  body("price").optional().isNumeric(),
  body("location").optional().isLength({ min: 0, max: 200 }).trim().escape(),
  body("seller").optional().isLength({ min: 1, max: 200 }).trim().escape(),
  body("locationCoords")
    .optional()
    .custom((value) => {
      try {
        JSON.parse(value);
      } catch (e) {
        throw new Error("Location Coordinates are not valid JSON");
      }
      return true;
    }),
  body("locationCoords")
    .optional()
    .custom((value) => {
      let parsed;
      try {
        parsed = JSON.parse(value);
      } catch (e) {
        throw new Error("Invalid JSON");
      }
      if (!Array.isArray(parsed) || parsed.length !== 2) {
        throw new Error("Must be an array of exactly two numbers");
      }
      if (!parsed.every((item) => typeof item === "number")) {
        throw new Error("Array must contain only numbers");
      }
      return true;
    })
    .trim()
    .escape(),
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

exports.add = [
  ...onlyExpectedFields,
  ...allRequiredValidations,
  ...validations,
  displayErrors,
];

exports.update = [...onlyExpectedFields, ...validations, displayErrors];
