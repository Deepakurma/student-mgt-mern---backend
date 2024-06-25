import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  id: {
    type: Number,
    required: [true, "Please provide an appropriate number"],
    unique: true,
    maxlength: [10, "The maximum numbers allowed are 10"],
    minlength: [10, "The minimum numbers allowed are 10"],
  },
  role: {
    type: String,
    enum: ["admin","faculty"],
    required: [true, "Please provide your role!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [5, "The minimum passwords allowed are 5"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide a password confirmation"],
    minlength: [5, "The minimum passwords allowed are 5"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match",
    },
  },
  passwordResetToken: String,
  passwordChangedAt: Date,
  passwordResetExpires: Date,
});

// Pre-save hook to hash the password
adminSchema.pre("save", function (next) {
  // Hash the password only if it's modified or new
  if (!this.isModified("password")) return next();

  // Generate a salt and hash the password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      // Delete passwordConfirm field as it's no longer needed
      this.passwordConfirm = undefined;
      next();
    });
  });
});

// Method to compare passwords
adminSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method for generating password reset token
adminSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(30).toString("hex");
  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
  return resetToken;
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
