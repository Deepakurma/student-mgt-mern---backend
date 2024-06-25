import express from "express";
// import morgan from "morgan";
// import { RateLimiter } from "rate-limiter";
// import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
// import xss from "xss";
// import hpp from "hpp";
import cors from "cors";

import studentRouter from "./routes/studentsRoutes.js";
import AppError from "./ErrorHandlers/AppErrors.js";
import { NextMidWare } from "./ErrorHandlers/error.js";
import adminRouter from "./routes/AdminRoutes.js";
import feedbackRouter from "./routes/FeedbackRoutes.js";

const app = express();
app.use(cors());

app.use(express.json());
// app.use(morgan("tiny"));

app.get("/", (req,res) =>{
  res.send("hello user");
})

//Routes of application
app.use("/clg/students", studentRouter);
app.use("/admin/auth", adminRouter);
app.use("/students/reviews",feedbackRouter)

//Limiter
// const limiter = RateLimiter({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "too many requests, please try later after 1hr!",
// });
// app.use("auth", limiter);

//sets security http headers
// app.use(helmet());

//Data sanitizer against query injection
app.use(ExpressMongoSanitize());

//Data sanitizer against xss
// app.use(xss());

//Prevent parameter pollution
// app.use(hpp());

//error handler
app.all("*", (req, res, next) => {
  const error = new AppError(`Wrong URL ${req.originalUrl}`, 404);
  next(error);
});

// Error handling middleware
app.use(NextMidWare);

export default app;
