const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      min: 3,
      max: 320,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: { type: {}, minlength: 100, required: true },
    price: {
      type: Number,
      default: 9.99,
    },
    image: {},
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: true,
    },
    instructor: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    lessons: [
      {
        type: ObjectId,
        ref: "Lesson",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
