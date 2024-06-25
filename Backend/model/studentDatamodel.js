import mongoose from "mongoose";
// import validator, { isDecimal } from "validator";

const studentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "Please provide an apropriate number"],
    unique: true,
    maxlength: [3, "The maximum numbers allowed are 3"],
    minlength: [3, "The minimum numbers allowed are 3"],
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
    // validate: [validator.isAlpha, "Please provide a valid name"],
  },
  semester: {
    type: Number,
    required: [true, "Please provide an apropriate semester"],
    maxlength: [1, "The maximum numbers allowed are 1"],
    minlength: [1, "The minimum numbers allowed are 1"],
  },
  math: {
    type: Number,
    required: [true, "Please provide an apropriate marks"],
    maxlength: [100, "The maximum numbers allowed are 100"],
    minlength: [1, "The minimum numbers allowed are 1"],
  },
  english: {
    type: Number,
    required: [true, "Please provide an apropriate marks"],
    maxlength: [100, "The maximum numbers allowed are 100"],
    minlength: [1, "The minimum numbers allowed are 1"],
  },
  science: {
    type: Number,
    required: [true, "Please provide an apropriate marks"],
    maxlength: [100, "The maximum numbers allowed are 100"],
    minlength: [1, "The minimum numbers allowed are 1"],
  },
  average: {
    type: Number,
    required: [true, "Please provide an apropriate marks"],
  },
});

export const StudentData = mongoose.model("StudentData", studentSchema);
