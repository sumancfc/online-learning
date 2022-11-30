const User = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/auth");

//user registration
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    !name && res.status(400).send("Name is required");

    if (!password || password.length < 6)
      return res.status(400).send("Name is required");

    let userExist = await User.findOne({ email }).exec();

    userExist && res.status(400).send("Email is taken");

    const passwordHashed = await hashPassword(password);

    const user = await new User({
      name,
      email,
      password: passwordHashed,
    }).save();

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try Again!!");
  }
};
