import express from "express";
import {
  createReview,
  deleteAllReview,
  getAllReviews,
  specificReview,
} from "../controllers/FeedbackController.js";
import {protect } from "../authentication/auth.js";

const feedbackRouter = express.Router();

feedbackRouter
  .route("/")
  .get(protect,getAllReviews)
  .delete(protect,deleteAllReview);
feedbackRouter.route("/:id").post(createReview);
feedbackRouter.route("/:faculty").get(protect,specificReview);

export default feedbackRouter;
