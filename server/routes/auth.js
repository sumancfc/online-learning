const express = require("express");

const router = express.Router();

const { register, login, verifyMail, logout } = require("../controllers/auth");
const { runValidation } = require("../validators");
const { registerValidation, loginValidation } = require("../validators/auth");

router.post("/register", registerValidation, runValidation, register);
router.post("/login", loginValidation, runValidation, login);
router.get("/verify", verifyMail);
router.get("/logout", logout);

//export router
module.exports = router;
