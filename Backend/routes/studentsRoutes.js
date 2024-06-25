import express from "express";
import {
  getAllStudents,
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  getTopStudents,
  getWeekStudents,
  getTopper,
} from "../controllers/AdminControllers.js";
import {protect } from "../authentication/auth.js";

const studentRouter = express.Router();

//Admin Routes
studentRouter.route("/topper").get(protect,getTopper);
studentRouter.route("/weekies").get(protect,getWeekStudents);
studentRouter.route("/toppers").get(protect,getTopStudents);
studentRouter
  .route("/all")
  .get(protect,getAllStudents)
  .post(protect,createStudent);

//Student routes
studentRouter
  .route("/:id")
  .get(getStudent)
  .patch(protect,updateStudent)
  .delete(protect, deleteStudent);

export default studentRouter;
