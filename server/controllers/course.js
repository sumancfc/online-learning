const fs = require("fs");
const AWS = require("aws-sdk");
const { nanoid } = require("nanoid");
const slugify = require("slugify");
const Category = require("../models/category");
const User = require("../models/user");
const Course = require("../models/course");

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

      res.json({ ok: true });
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

    console.log(course);
    return res.status(200).json(course);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Course Failed To Create" });
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
    return res.status(400).json({ error: "Course Failed To Create" });
  }
};
