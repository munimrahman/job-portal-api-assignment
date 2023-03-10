const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new Schema(
  {
    // For All Users
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name must be at most 100 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Provide a valid email address"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) => {
          validator.isStrongPassword(value, {
            minLength: 6,
            minLoweCase: 1,
            minUpperCase: 1,
            minNumbers: 1,
            minSymbols: 1,
          });
        },
        message: "Password is not strong enough",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (value) {
          return this.password === value;
        },
      },
      message: "Password does not match",
    },
    role: {
      type: String,
      enum: ["candidate", "hiring-manager", "admin"],
      default: "candidate",
    },
    // For only Candidates
    resume: {
      type: String,
    },
    skills: [String],
    experience: [
      {
        title: String,
        company: String,
        // description: String,
      },
    ],
    education: [
      {
        degree: String,
        school: String,
        // description: String,
      },
    ],
    appliedJobs: [
      {
        type: Schema.Types.ObjectId,
        ref: "JobPost",
      },
    ],
    // For Hiring Managers
    company: {
      type: String,
    },
    jobPostings: [
      {
        type: Schema.Types.ObjectId,
        ref: "JobPost",
      },
    ],
    jobApplications: [
      {
        type: Schema.Types.ObjectId,
        ref: "JobApply",
      },
    ],

    confirmationToken: String,
    confirmationTokenExpires: Date,

    passwordChangeAt: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    //  only run if password is modified, otherwise it will change every time we save the user!
    return next();
  }
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordMatch = bcrypt.compareSync(password, hash);
  return isPasswordMatch;
};

userSchema.methods.generateConfirmationToken = function () {
  const confirmationToken = crypto.randomBytes(20).toString("hex");
  this.confirmationToken = confirmationToken;

  const date = new Date();
  date.setMinutes(date.getMinutes() + 2);
  this.confirmationTokenExpires = date;

  return confirmationToken;
};

module.exports = mongoose.model("User", userSchema);
