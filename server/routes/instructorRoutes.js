const express = require("express");

const router = express.Router();

const { requireSignin } = require("../middlewares");
const {
  createInstructor,
  accountStatus,
  currentInstructor,
  getAllCoursesByInstructor,
} = require("../controllers/instructorControllers");

router.post("/create-instructor", requireSignin, createInstructor);
router.post("/account-status", requireSignin, accountStatus);
router.get("/current-instructor", requireSignin, currentInstructor);
router.get("/courses-by-instructor", requireSignin, getAllCoursesByInstructor);

//export router
module.exports = router;
