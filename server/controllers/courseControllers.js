const fs = require("fs");
const AWS = require("aws-sdk");
const { nanoid } = require("nanoid");
const slugify = require("slugify");
const Course = require("../models/courseModel");
const User = require("../models/userModel");

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

// course's image upload to aws s3
exports.imageUploadToAWS = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) return res.status(400).json({ error: "No Image Found" });

    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const type = image.split(";")[0].split("/")[1];

    const params = {
      Bucket: "online-learning-bucket",
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };

    // upload image to aws s3
    S3.upload(params, (err, data) => {
      if (err) {
        return res.sendStatus(400);
      }

      res.send(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed to Upload Image. Try Again" });
  }
};

// course's image remove from aws s3
exports.imageRemoveFromAWS = async (req, res) => {
  try {
    const { image } = req.body;

    const params = {
      Bucket: image.Bucket,
      Key: image.Key,
    };

    // send remove request to s3
    S3.deleteObject(params, (err, data) => {
      if (err) {
        res.sendStatus(400);
      }
      res.send({ ok: true });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed to Remove Image. Try Again" });
  }
};

// course's video upload to aws s3
exports.videoUploadToAWS = async (req, res) => {
  try {
    //check if user is instructor or not
    req.user._id != req.params.instructor &&
      res.status(400).json({ error: "User is not Authorized." });

    const { video } = req.files;

    !video && res.status(400).json({ error: "Vidoe not Found." });

    // video params
    const params = {
      Bucket: "online-learning-bucket",
      Key: `${nanoid()}.${video.type.split("/")[1]}`,
      Body: fs.readFileSync(video.path),
      ACL: "public-read",
      ContentType: video.type,
    };

    // upload video to aws s3
    S3.upload(params, (err, data) => {
      err && res.sendStatus(400);

      res.json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed to Upload Video. Try Again" });
  }
};

// course's video remove from aws s3
exports.videoRemoveFromAWS = async (req, res) => {
  try {
    //check if user is instructor or not
    req.user._id != req.params.instructor &&
      res.status(400).json({ error: "User is not Authorized." });

    const { Bucket, Key } = req.body;

    // video params
    const params = {
      Bucket,
      Key,
    };

    // remove from aws s3
    S3.deleteObject(params, (err, data) => {
      err && res.sendStatus(400);

      res.json({ message: "Video Deleted Successfully" });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed to Upload Video. Try Again" });
  }
};

// create course by instructor
exports.createCourse = async (req, res) => {
  try {
    const courseExist = await Course.findOne({
      slug: slugify(req.body.name.toLowerCase()),
    });
    courseExist && res.status(400).json({ error: "Course is Already Present" });

    const course = await new Course({
      slug: slugify(req.body.name),
      instructor: req.user._id,
      ...req.body,
    }).save();

    return res.status(200).json(course);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Course Failed To Create" });
  }
};

// get all the courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ published: true })
      .populate("instructor", "_id name")
      .populate("category", "_id name")
      .exec();

    return res.json(courses);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed to Get All Courses!" });
  }
};

// get single course by slug
exports.getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
      .populate("instructor", "_id name")
      .populate("category", "name")
      .exec();

    return res.status(200).json(course);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed To Get Single Course" });
  }
};

// update course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
      .populate("category", "name")
      .exec();

    req.user._id != course.instructor &&
      res.status(400).json({ error: "User is not Authorized." });

    const updateCourse = await Course.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true,
      }
    ).exec();

    return res.status(200).json(updateCourse);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Course Failed To Update" });
  }
};

// add lesson to course
exports.addLessonToCourse = async (req, res) => {
  try {
    const { title, content, video } = req.body;

    //check if user is instructor or not
    req.user._id != req.params.instructor &&
      res.status(400).json({ error: "User is not Authorized." });

    const courseUpdate = await Course.findOneAndUpdate(
      { slug: req.params.slug },
      {
        $push: {
          lessons: {
            title,
            content,
            video,
            slug: slugify(title).toLowerCase(), //change slug to lower case
          },
        },
      },
      { new: true }
    )
      .populate("instructor", "_id name")
      .exec();

    return res.status(200).json(courseUpdate);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Lesson Failed To Add" });
  }
};

// add lesson to course
exports.updateLessonToCourse = async (req, res) => {
  try {
    const { slug } = req.params;
    const { _id, title, content, video, free_video_preview } = req.body;
    const course = await Course.findOne({ slug }).select("instructor").exec();

    course.instructor._id != req.user._id &&
      res.status(400).json({ error: "User is not Authorized." });

    await Course.updateOne(
      { "lessons._id": _id },
      {
        $set: {
          "lessons.$.title": title,
          "lessons.$.content": content,
          "lessons.$.video": video,
          "lessons.$.free_video_preview": free_video_preview,
        },
      },
      { new: true }
    ).exec();

    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Lesson Failed To Add" });
  }
};

//delete lesson from course
exports.deleteLessonFromCourse = async (req, res) => {
  try {
    const { slug, lesson } = req.params;

    const course = await Course.findOne({ slug }).exec();
    //check if user is instructor or not
    req.user._id != course.instructor &&
      res.status(400).json({ error: "User is not Authorized." });

    await Course.findByIdAndUpdate(course._id, {
      $pull: { lessons: { _id: lesson } },
    }).exec();

    res.json({ ok: "Course Deleted Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Lesson Failed To Delete" });
  }
};

// publish course
exports.publishYourCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).select("instructor").exec();

    course.instructor._id != req.user._id &&
      res.status(400).json({ error: "User is not Authorized." });

    const updateCourse = await Course.findByIdAndUpdate(
      courseId,
      { published: true },
      { new: true }
    ).exec();

    return res.status(200).json(updateCourse);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Course Failed to Publish." });
  }
};

// unpublish course
exports.unpublishYourCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).select("instructor").exec();

    course.instructor._id != req.user._id &&
      res.status(400).json({ error: "User is not Authorized." });

    const updateCourse = await Course.findByIdAndUpdate(
      courseId,
      { published: false },
      { new: true }
    ).exec();

    return res.status(200).json(updateCourse);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Course Failed to Unpublish." });
  }
};

// check if user is enrolled in course
exports.checkCourseEnrollment = async (req, res) => {
  try {
    const { courseId } = req.params;

    const user = await User.findById(req.user._id).exec();

    let userCourseids = [];
    let length = user.courses && user.courses.length;

    for (let i = 0; i < length; i++) {
      userCourseids.push(user.courses[i].toString());
    }

    return res.json({
      status: userCourseids.includes(courseId),
      course: await Course.findById(courseId).exec(),
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed to Get Enrollment Data" });
  }
};

// free course enrollment
exports.freeCourseEnrollment = async (req, res) => {
  try {
    const { courseId } = req.params;
    // check course free or not
    const course = await Course.findById(courseId).exec();
    if (course.paid) return;

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { courses: course._id },
      },
      { new: true }
    ).exec();

    return res.json(course);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed to Enrollment" });
  }
};

//get user's course
exports.getUserCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();

    const courses = await Course.find({ _id: { $in: user.courses } })
      .populate("instructor", "_id name")
      .populate("category", "_id name")
      .exec();

    return res.json(courses);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed to Get User Courses" });
  }
};

//get user's single course
exports.getUserCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
      .populate("instructor", "_id name")
      .populate("category", "name")
      .exec();

    return res.status(200).json(course);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed To Get Single Course" });
  }
};
