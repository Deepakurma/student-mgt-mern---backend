import { StudentData } from "../model/studentDatamodel.js";
import { catchAsync } from "../ErrorHandlers/catchAsync.js";
import AppError from "../ErrorHandlers/AppErrors.js";
import Admin from "../model/Admin.js";

export const getAllStudents = catchAsync(async (req, res, next) => {
  const students = await StudentData.find();
  res.status(200).json(students);
});

export const createStudent = catchAsync(async (req, res, next) => {
  const newStudent = await StudentData.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      student: newStudent,
    },
  });
});

export const getStudent = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;
  const currentStudent = await StudentData.findOne({ id });

  if (!currentStudent) {
    return next(new AppError("No student found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      currentStudent,
    },
  });
});

export const updateStudent = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;
  const studentUpdated = await StudentData.findOneAndUpdate(
    { id: id },
    req.body,
    {
      new: true,
    }
  );

  if (!studentUpdated) {
    return next(new AppError("No student found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      studentUpdated,
    },
  });
});

export const deleteStudent = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;
  const deleteStudent = await StudentData.findOneAndDelete({ id: id });

  if (!deleteStudent) {
    return next(new AppError("No student found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});

export const getTopStudents = catchAsync(async (req, res, next) => {
  const students = await StudentData.find({ average: { $gte: 90 } });
  res.status(200).json(students);
});

export const getWeekStudents = catchAsync(async (req, res, next) => {
  const students = await StudentData.find({ average: { $lte: 40 } });

  // if (students.length > 0) {
    res.status(200).json(students);
  // } else {
  //   return next(
  //     new AppError(
  //       "No students with an average score less than or equal to 40%",
  //       404
  //     )
  //   );
  // }
});

export const getTopper = catchAsync(async (req, res, next) => {
  const student = await StudentData.findOne().sort({ average: -1 });

  if (!student) {
    return next(new AppError("No students found", 404));
  }

  res.status(200).json([student]);
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  const Users = await Admin.find();

  if (!Users) {
    return next(new AppError("No Users found", 404));
  }

  res.status(200).json(Users);
});

