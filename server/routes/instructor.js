const express = require("express");

const router = express.Router();

const { requireSignin } = require("../middlewares");
const {
  createInstructor,
  accountStatus,
  currentInstructor,
} = require("../controllers/instructor");

router.post("/create-instructor", requireSignin, createInstructor);
router.post("/account-status", requireSignin, accountStatus);
router.get("/current-instructor", requireSignin, currentInstructor);

//export router
module.exports = router;
