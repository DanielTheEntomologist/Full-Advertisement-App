const express = require("express");
const router = express.Router();

const user = require("../controllers/user.controller");

router.get("/user", user.getAll);
router.get("/user/:id", user.get);
router.delete("/user/:id", user.remove);

module.exports = router;
