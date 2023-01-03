const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const User = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/auth");
const { sendEmail } = require("../utils/sendEmail");

//user registration
exports.register = async (req, res) => {
  try {
    //get name, email and password
    const { name, email, password } = req.body;
    //check if user already exist
    let userExist = await User.findOne({ email }).exec();
    //email validation
    if (userExist) {
      return res.status(400).json({ error: "Email is already taken" });
    }
    //hash plain password
    const passwordHashed = await hashPassword(password);
    //save the new user
    const user = await new User({
      name,
      email,
      password: passwordHashed,
    }).save();

    let message = `<p>Hi ${name} , Please click here to <a href="http://localhost:3000/emailVerify/${user._id}" target="_blank">Verify Your Email</a></p>`;
    //return success response
    if (user) {
      //send verify email to user
      await sendEmail(email, "For Email Verification", message);

      return res.status(201).json({ ok: true });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Error. Try Again!!" });
  }
};

//user login
exports.login = async (req, res) => {
  try {
    //get email, password
    const { email, password } = req.body;
    //find user using email
    const user = await User.findOne({ email }).exec();
    //check if user is exist
    if (!user) return res.status(400).json({ error: "Sorry, No user found" });
    //compare password
    const matchPassword = await comparePassword(password, user.password);

    if (!matchPassword)
      return res.status(400).json({ error: "Password not matched" });

    if (!user.is_verified)
      return res.status(400).json({
        error: "An email has been sent to your account. Please Verify.",
      });

    //generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    //undefined password for not showing in response json
    user.password = undefined;

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Error. Try Again!!" });
  }
};

//verify email
exports.verifyMail = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });

    if (!user) return res.status(400).json({ error: "Invalid Link" });

    await User.updateOne({}, { $set: { is_verified: true } });

    return res.status(200).json({ message: "Email Verified!!" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Internal Server Error" });
  }
};

//user logout
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "User logout successfully!!" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Error. Try Again!!" });
  }
};

//auth middleware
exports.authMiddleware = async (req, res, next) => {
  const user = await User.findById({ _id: req.user._id });

  if (!user) return res.status(400).json({ error: "User not found" });

  req.profile = user;

  next();
};

//get the login user
exports.currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").exec();
    console.log("Current User", user);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Error. Try Again!!" });
  }
};

//forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const code = nanoid(6).toUpperCase();

    console.log(email, code);

    const user = await User.findOneAndUpdate(
      { email },
      { resetPassword: code }
    );

    if (!user) return res.status(400).json({ error: "User Not Found" });

    let message = `Hi ${user.name} , Please, use this code to reset your password: <strong>${code}</strong>`;
    //return success response
    if (user) {
      //send reset code to user
      await sendEmail(email, "For Password Reset", message);

      return res.status(200).json({ ok: true });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Internal Server Error" });
  }
};

//reset password
exports.resetPassword = async (req, res) => {
  try {
    const { email, resetCode, newPassword } = req.body;
    //hash plain password
    const passwordHashed = await hashPassword(newPassword);

    const user = await User.findOneAndUpdate(
      {
        email,
        resetPassword: resetCode,
      },
      { resetPassword: "", password: passwordHashed }
    ).exec();

    if (user) return res.status(200).json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Error. Try Again!!" });
  }
};
