const express = require("express");
const router = express.Router();

const user = require("../controllers/user.controller");
const { filterCredentials } = require("../utils/filterCredentials");

router.get("/users", filterCredentials, user.getAll);
router.get("/users/:id", filterCredentials, user.get);

module.exports = router;
