const express = require("express");
const router = express.Router();

const { runValidation } = require("../validators");
const { categoryValidator } = require("../validators/category");
const {
  imageUploadToAWS,
  imageRemoveFromAWS,
} = require("../controllers/course");
const { requireSignin, isInstructor } = require("../middlewares");

// image upload and remove from aws
router.post("/course/upload-image", imageUploadToAWS);
router.post("/course/remove-image", imageRemoveFromAWS);

module.exports = router;
