const express = require("express");

const router = express.Router();

//import from auth controller
const { register } = require("../controllers/auth");

router.post("/register", register);

//export router
module.exports = router;
