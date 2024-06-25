import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Please provide a feedback!"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    faculty: {
      type: String,
      enum: ["deepak", "hermit"],
      required: [true, "Review must belong to a Faculty!"],
    },
    student: {
      type: mongoose.Schema.ObjectId,
      ref: "StudentData",
      required: [true, "Please provide your id!"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

FeedbackSchema.index({ faculty: 1, student: 1 }, { unique: true });

FeedbackSchema.pre(/^find/, function (next) {
  this.populate({
    path: "student",
    select: "name",
  });
  next();
});

export const Feedback = mongoose.model("Feedback", FeedbackSchema);
