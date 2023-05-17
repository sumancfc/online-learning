const express = require("express");

const router = express.Router();

const { requireSignin } = require("../middlewares");
const { runValidation } = require("../validators");
const { registerValidation, loginValidation } = require("../validators/auth");
const {
  register,
  login,
  verifyMail,
  logout,
  currentUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authControllers");

router.post("/register", registerValidation, runValidation, register);
router.post("/login", loginValidation, runValidation, login);
router.get("/verify/:id", verifyMail);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

//export router
module.exports = router;
