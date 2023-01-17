const expressJwt = require("express-jwt");
const User = require("../models/user");
const Course = require("../models/course");

exports.requireSignin = expressJwt({
  getToken: (req, res) => req.cookies.token,
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

//check if user is instructor or not
exports.isInstructor = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).exec();
    if (!user.role.includes("Instructor")) {
      return res.sendStatus(403);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

//check if user is enrolled on course or not
exports.userEnrolled = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).exec();
    const course = await Course.findOne({ slug: req.params.slug }).exec();

    // check for course id in user courses
    let ids = [];
    for (let i = 0; i < user.courses.length; i++) {
      ids.push(user.courses[i].toString());
    }

    if (!ids.includes(course._id.toString())) {
      res.sendStatus(403);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
