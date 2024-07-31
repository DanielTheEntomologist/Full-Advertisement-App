const express = require("express");
const router = express.Router();

const user = require("../controllers/user.controller");

router.get("/users", user.getAll);
router.get("/users/:id", user.get);

module.exports = router;
