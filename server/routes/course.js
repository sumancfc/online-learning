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
  checkCourseEnrollment,
  freeCourseEnrollment,
  getUserCourse,
  getUserCourseBySlug,
} = require("../controllers/course");
const { requireSignin, isInstructor, userEnrolled } = require("../middlewares");

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

//get user's course
router.get("/course/user-course", requireSignin, getUserCourse);
router.get(
  "/course/user/:slug",
  requireSignin,
  userEnrolled,
  getUserCourseBySlug
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

//user enroll to course
router.get(
  "/course/enrollment-check/:courseId",
  requireSignin,
  checkCourseEnrollment
);
router.post(
  "/course/enrollment-free/:courseId",
  requireSignin,
  freeCourseEnrollment
);

module.exports = router;
