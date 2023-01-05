const mongoose = require("mongoose");
const { Schema } = mongoose;

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

module.exports = mongoose.model("Lesson", lessonSchema);
