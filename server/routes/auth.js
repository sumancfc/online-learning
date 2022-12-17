const express = require("express");

const router = express.Router();

const {
  register,
  login,
  verifyMail,
  logout,
  currentUser,
} = require("../controllers/auth");
const { requireSignin } = require("../middlewares");
const { runValidation } = require("../validators");
const { registerValidation, loginValidation } = require("../validators/auth");

router.post("/register", registerValidation, runValidation, register);
router.post("/login", loginValidation, runValidation, login);
router.get("/verify", verifyMail);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);

//export router
module.exports = router;
