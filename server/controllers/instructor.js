const User = require("../models/user");
const Course = require("../models/course");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const queryString = require("querystring");

//create instructor
exports.createInstructor = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // if user don't have stripe account then create new account
    if (!user.stripe_account_id) {
      const newAccount = await stripe.accounts.create({ type: "express" });

      user.stripe_account_id = newAccount.id;
      await user.save();
    }

    // create accound link using new account id #for frontend
    let linkAccount = await stripe.accountLinks.create({
      account: user.stripe_account_id,
      refresh_url: process.env.STRIPE_REDIRECT_URL,
      return_url: process.env.STRIPE_REDIRECT_URL,
      type: "account_onboarding",
    });

    // pre-fill any information like email and send url resposne to frontend
    linkAccount = Object.assign(linkAccount, {
      "stripe_user[email]": user.email,
    });

    // send the account link as response to frontend
    return res.send(`${linkAccount.url}?${queryString.stringify(linkAccount)}`);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Failed to Create Instructor!");
  }
};

// instructor stripe account status
exports.accountStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const instructorAccount = await stripe.accounts.retrieve(
      user.stripe_account_id
    );

    if (!instructorAccount.charges_enabled) {
      return res.staus(401).send("Unauthorized");
    } else {
      const updateStatus = await User.findByIdAndUpdate(
        user._id,
        {
          stripe_seller: instructorAccount,
          $addToSet: { role: "Instructor" },
        },
        { new: true }
      ).select("-password");

      return res.status(200).json(updateStatus);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Failed to Get Account Status");
  }
};

//get the login user having role instructor
exports.currentInstructor = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user.role.includes("Instructor")) {
      return res.sendStatus(403);
    } else {
      return res.status(200).json({ ok: true });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try Again!!");
  }
};

// get all him courses by the instructor
exports.getAllCoursesByInstructor = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id })
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).json(courses);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: "Failed To Get Course By Instructor" });
  }
};
