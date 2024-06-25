import { catchAsync } from "../ErrorHandlers/catchAsync.js";
import Admin from "../model/Admin.js"; // Adjust the import to Admin model
import jwt from "jsonwebtoken";
import AppError from "../ErrorHandlers/AppErrors.js";
import util from "util";

const token = (userid) => {
  return jwt.sign({ id: userid }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await Admin.create({
    // Change Student to Admin
    name: req.body.name,
    id: req.body.id,
    role: req.body.role,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const userToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  res.status(200).json({
    status: "success",
    userToken,
    data: {
      newUser: newUser,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { id, password } = req.body;

  if (!id || !password) {
    next(new AppError("please provide a id and password"));
  }

  const currentUser = await Admin.findOne({ id: id }).select("+password"); // Change Student to Admin
  console.log(currentUser);

  if (!currentUser || !(await currentUser.correctPassword(password))) {
    next(new AppError("no admin found"));
  } else {
    const userToken = token(currentUser._id);
    res.status(200).json({
      status: "success",
      userToken,
      data: {
        currentUser,
      },
    });
  }
});

export const protect = catchAsync(async (req, res, next) => {
  console.log("hwllo from protec");
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Login as admin to access this route!', 401));
  }

  const verifyTokenAsync = util.promisify(jwt.verify);
  const decoded = await verifyTokenAsync(token, process.env.JWT_SECRET);

  const freshUser = await Admin.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError('No admin found', 401));
  }

  req.user = freshUser;
  console.log(`user is ${freshUser}`);
  next();
});

// export const Restrict = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(new AppError("You are not allowed to access this!", 401));
//     }

//     // Call next() here to proceed to the next middleware
//     next();
//   };
// };

export const ResetToken = (req, res, next) => {};

export const ForgotPassword = async (req, res, next) => {
  const user = await Admin.findOne({ id: req.body.id }); // Change Student to Admin
  if (!user) {
    return next(new AppError("no admin found"), 401); // Change student to admin
  }

  const resetToken = user.resetPassword();
  await user.save({ validateBeforeSave: false });
  next();
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) newObj[key] = obj[key];
  });
  return newObj;
};

export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError("This route is not for updating the password!", 400)
    );
  }

  const filterBody = filterObj(req.body, "name", "role");
  console.log(req.user._id);
  const updatedUser = await Admin.findByIdAndUpdate(
    // Change Student to Admin
    req.user._id,
    filterBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  await Admin.findByIdAndDelete(req.user._id); // Change Student to Admin

  res.status(200).json({
    status: "success",
    data: null,
  });
});
