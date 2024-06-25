// import AppError from "./AppErrors.js";

const sendErrorDev = (err, req, res) => {
  // Respond with the error details
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message || "Internal Server Error";
  if (`${statusCode}`.startsWith("4")) {
    // If status code starts with 4, it's a client error
    res.status(statusCode).json({
      status: "fail",
      message,
      error: err,
    });
  } else {
    // Otherwise, it's a server error
    res.status(statusCode).json({
      status,
      message,
      error: err,
    });
  }
};

const sendErrorPro = (err, req, res) => {
  // Respond with the error details
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message || "Internal Server Error";
  if (`${statusCode}`.startsWith("4")) {
    // If status code starts with 4, it's a client error
    res.status(statusCode).json({
      status: "fail",
      message,
    });
  } else {
    // Otherwise, it's a server error
    res.status(statusCode).json({
      status,
      message,
    });
  }
};

export const NextMidWare = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorPro(err, req, res);
  }
};
