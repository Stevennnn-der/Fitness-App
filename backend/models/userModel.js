const mongoose = require("mongoose");
const workoutSchema = require("./workoutTableModel");

const userSchema = mongoose.Schema({
  avatar: {
    type: String,
    default: '/static/media/default-avatar-image.b0cd019b50700d3cbaa3.jpeg',
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
    required: [true, "Please Add the First Name"],
  },

  lastName: {
    type: String,
    required: [true, "Please Add the Last Name"],
  },

  phoneNumber: {
    type: String,
    required: [true, "Please Add the Phone Number"],
  },

  address: {
    type: String,
    required: [true, "Please Add the Address"],
  }, 

  gender: {
    type: String,
    required: [true, "Please Add the Gender"],
  },

  dataTables: [workoutSchema]
});

module.exports = mongoose.model("User", userSchema);
