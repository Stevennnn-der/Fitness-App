const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const functions = require("firebase-functions");

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  // Check if the user has registered
  const userAvailable = await User.findOne({ email: email });
  if (userAvailable) {
    res.status(400).json({ message: "Email already registered." });
    return;
  }

  // Check if any of the fields is missing
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("ALL fields are MANDATORY.");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created: ${user}`);

  // Check if user data is valid
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is NOT VALID!");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await User.findOne({ email });
  if (user) {
    if (!(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Password is NOT valid!" });
      return;
    }

    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          _id: user._id,
        },
      },
      functions.config().app.access_token_secret,
      { expiresIn: "180m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401).json({ message: "Email does NOT exist!" });
  }
});

module.exports = {
  registerUser,
  loginUser,
};
