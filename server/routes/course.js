const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();

const {
  getCourses,
  imageUploadToAWS,
  imageRemoveFromAWS,
  videoUploadToAWS,
  videoRemoveFromAWS,
  createCourse,
  getCourseBySlug,
  updateCourse,
  addLessonToCourse,
  updateLessonToCourse,
  deleteLessonFromCourse,
  publishYourCourse,
  unpublishYourCourse,
} = require("../controllers/course");
const { requireSignin, isInstructor } = require("../middlewares");

router.get("/course/all", getCourses);

// image upload and remove from aws
router.post("/course/upload-image", imageUploadToAWS);
router.post("/course/remove-image", imageRemoveFromAWS);

// video upload and remove from aws
router.post(
  "/course/upload-video/:instructor",
  requireSignin,
  formidable(),
  videoUploadToAWS
);
router.post(
  "/course/remove-video/:instructor",
  requireSignin,
  videoRemoveFromAWS
);

// course routes
router.post("/course/create", requireSignin, isInstructor, createCourse);
router.get("/course/:slug", getCourseBySlug);
router.put("/course/:slug", requireSignin, updateCourse);

// course publish unpublish --> it is in top then course lesson :: to avoid error because course lesson have to params
router.put("/course/publish/:courseId", requireSignin, publishYourCourse);
router.put("/course/unpublish/:courseId", requireSignin, unpublishYourCourse);

//lesson add to course routes
router.post(
  "/course/lesson/:slug/:instructor",
  requireSignin,
  addLessonToCourse
);
router.put(
  "/course/lesson/:slug/:instructor",
  requireSignin,
  updateLessonToCourse
);
router.put("/course/:slug/:lesson", requireSignin, deleteLessonFromCourse);

module.exports = router;
