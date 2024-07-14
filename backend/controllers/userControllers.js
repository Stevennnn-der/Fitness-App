const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

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

const updateUser = asyncHandler(async (req, res) => {
  const { id, firstName, lastName, phoneNumber, gender, address } = req.body;
  if (!id) {
    return res.status(400).send({ error: "User ID is required" });
  }
  const updateData = { firstName, lastName, phoneNumber, gender, address };

  const updatedUser = await User.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });
  console.log("I SEND THE DATA!");
  if (!updatedUser) {
    return res.status(404).send({ error: "User not found" });
  }
  res.send(updatedUser);
});

const uploadAvatar = asyncHandler(async (req, res) => {
  console.log(req.file);
  try {
    const userId = req.body.user_id;
    const file = req.file;

    if (!file) {
      return res.status(400).send({ message: "Please upload a file." });
    }

    const user = await User.findById(userId);

    user.avatar = `/${file.filename}`;
    await user.save();

    res.status(200).send({
      message: "Avatar updated successfully!",
      location: user.avatar,
    });
  } catch (error) {
    console.error("Error on Updating Avatar", error);
    res.status(500).send({ message: "Error on updating Avatar!", error });
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
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401).json({ message: "Email does NOT exist!" });
  }
});

const currentUser = asyncHandler(async (req, res) => {
  // console.log("ID ", req.user._id);
  const user = await User.findById(req.user._id);
  if (user) {
    res.json(user);
  } else {
    console.log("hiiiiiiiiii");
    res.status(404).json({ message: "user not founnd" });
  }
});

const createWorkoutTable = asyncHandler(async (req, res) => {
  const { userId, numRow, numCol, data: rawData, date, bodyPart } = req.body;
  console.log(req.body);
  console.log(rawData);
  function transformData() {
    return rawData.slice(1).map(row => ({
      action: row[0],
      sets: row.slice(1, -1),
    }))
  }

  const data = transformData();
  console.log('DATA:', data);
  try {
    // Find the user by ID and check if they have a workout for the specific day
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if there is already a workout table for the given date
    const existingWorkoutIndex = user.dataTables.findIndex(
      (workout) => workout.workoutDate === date
    );

    if (existingWorkoutIndex !== -1) {
      user.dataTables[existingWorkoutIndex].bodyPart = bodyPart;
      user.dataTables[existingWorkoutIndex].numRow = numRow;
      user.dataTables[existingWorkoutIndex].numCol = numCol;
      user.dataTables[existingWorkoutIndex].data = data;
      await user.save();
      return res.status(200).json({
        message: "Workout updated successfully",
        workout: user.dataTables[existingWorkoutIndex],
      });
    } else {
      user.dataTables.push({
        workoutDate: date,
        bodyPart,
        numRow,
        numCol,
        data,
      });
      await user.save();
      return res.status(200).json({
        message: "Workout updated successfully",
        workout: user.dataTables[existingWorkoutIndex],
      });
    }
  } catch (error) {
    console.error("Failed to create workout table:", error);
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
});

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  currentUser,
  uploadAvatar,
  createWorkoutTable,
};
