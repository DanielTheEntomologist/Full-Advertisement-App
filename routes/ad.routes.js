const express = require("express");
const router = express.Router();

const adController = require("../controllers/ad.controller");
const adValidator = require("../validators/ad.validator");
const authMiddleware = require("../utils/authMiddleware");
const uploadImage = require("../utils/uploadImage");

router.get("/ads", adController.getAll);
router.get("/ads/:id", adController.get);

router.post(
  "/ads",
  authMiddleware.isAuthorised,
  uploadImage.uploadFile.single("image"),
  adValidator.add,
  adController.add
);

router.delete("/ads/:id", authMiddleware.isAuthorised, adController.delete);
router.patch("/ads/:id", authMiddleware.isAuthorised, adController.update);

router.get("/ads/search/:searchPhrase", adController.search);

module.exports = router;
