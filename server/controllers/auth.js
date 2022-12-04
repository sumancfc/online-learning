const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/auth");
const { sendVerifyEmail } = require("../utils/emailVerify");

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
    //return success response
    if (user) {
      //send verify email to user
      await sendVerifyEmail(user._id, name, email);

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

exports.verifyMail = async (req, res) => {
  try {
    const updateInfo = await User.updateOne(
      { _id: req.params.id },
      { $set: { is_verified: true } }
    );

    console.log("Helllo");

    console.log(updateInfo);
    return res.json({ message: "Email Verified!!" });
  } catch (err) {
    console.log(err);
    console.log("Error");
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
