const mongoose = require("mongoose");
const workoutSchema = require("./workoutTableSchema");
const weightSchema = require("./weightSchema");
const sleepSchema = require("./sleepSchema");

const userSchema = mongoose.Schema({
  avatar: {
    type: String,
    default: "/default-avatar-image.jpeg",
  },

  email: {
    type: String,
    required: [true, "Please Add the Email!"],
  },

  username: {
    type: String,
    required: [true, "Please Add the Username!"],
  },

  password: {
    type: String,
    required: [true, "Please Add the User Password"],
  },

  firstName: {
    type: String,
    // required: [true, "Please Add the First Name"],
    required: false,
  },

  lastName: {
    type: String,
    // required: [true, "Please Add the Last Name"],
    required: false,
  },

  phoneNumber: {
    type: String,
    // required: [true, "Please Add the Phone Number"],
    required: false,
  },

  address: {
    type: String,
    // required: [true, "Please Add the Address"],
    required: false,
  },

  gender: {
    type: String,
    // required: [true, "Please Add the Gender"],
    required: false,
  },

  dataTables: [workoutSchema],
  weights: {
    goalInKg: { type: Number },
    userWeight: [weightSchema],
  },

  sleepHours: [sleepSchema],
});

userSchema.pre("save", function (next) {
  this.weights.userWeight.sort((a, b) => new Date(a.weightDate) - new Date(b.weightDate));
  this.sleepHours.sort((a, b) => new Date(b.sleepDate) - new Date(a.sleepDate));
  next();
});

module.exports = mongoose.model("User", userSchema);
