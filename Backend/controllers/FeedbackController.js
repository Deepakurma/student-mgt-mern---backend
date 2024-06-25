import { Feedback } from "../model/feedbackModel.js";
import { catchAsync } from "../ErrorHandlers/catchAsync.js";
import AppError from "../ErrorHandlers/AppErrors.js";

export const createReview = catchAsync(async (req, res, next) => {
  if (!req.body.student) req.body.student = req.params.id;
  const review = await Feedback.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: review,
    },
  });
});

export const deleteAllReview = catchAsync(async (req, res, next) => {
  const review = await Feedback.deleteMany();

  res.status(201).json({
    status: "success",
    data: {
      data: null,
    },
  });
});

export const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Feedback.find();

  res.status(201).json({
    status: "success",
    data: {
      data: reviews,
    },
  });
});

export const specificReview = catchAsync(async (req, res, next) => {
  const facultyName = req.params.faculty;
  const faculties = ["deepak", "hermit"];

  if (faculties.includes(facultyName)) {
    const facultyReview = await Feedback.find({ faculty: facultyName });
    if (facultyReview.length === 0) {
      return next(new AppError("No Reviews found!", 404));
    }
  } else {
    return next(new AppError("No faculty found!", 404));
  }

  res.status(201).json({
    status: "success",
    data: {
      facultyReview,
    },
  });
});
