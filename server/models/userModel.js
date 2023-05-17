const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      index: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 20,
    },
    user_image: {
      type: String,
      default: "/avatar.png",
    },
    role: {
      type: [String],
      default: ["Student"],
      enum: ["Student", "Instructor", "Admin"],
    },
    resetPassword: {
      data: String,
      default: "",
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
    courses: [{ type: ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
