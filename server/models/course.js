const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;

const lessonSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      min: 3,
      max: 320,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    content: { type: {}, minlength: 100 },
    video: {},
    free_video_preview: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

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
    lessons: [lessonSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
