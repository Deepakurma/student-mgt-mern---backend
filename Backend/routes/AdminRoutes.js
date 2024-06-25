import express from "express";
import {
  ForgotPassword,
  ResetToken,
  deleteMe,
  login,
  signup,
  // Restrict
} from "../authentication/auth.js";
import { updateMe } from "../authentication/auth.js";
import { protect } from "../authentication/auth.js";
import {getAllUsers } from "../controllers/AdminControllers.js";

const adminRouter = express.Router();

adminRouter.route("/signup").post(signup);
adminRouter.route("/login").post(login);
adminRouter.route("/resetpassword").post(ResetToken);
adminRouter.route("/forgotpassword").post(ForgotPassword);
adminRouter.route("/updateMe").patch(protect, updateMe);
adminRouter.route("/deleteMe").patch(protect, deleteMe);
adminRouter.route("/").get(protect,getAllUsers);

export default adminRouter;
