const express = require("express");
const router = express.Router();

const {
  imageUploadToAWS,
  imageRemoveFromAWS,
  createCourse,
} = require("../controllers/course");
const { requireSignin, isInstructor } = require("../middlewares");

// image upload and remove from aws
router.post("/course/upload-image", imageUploadToAWS);
router.post("/course/remove-image", imageRemoveFromAWS);

// course routes
router.post("/course/create", requireSignin, isInstructor, createCourse);

module.exports = router;
