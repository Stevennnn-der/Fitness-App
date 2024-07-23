const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const currentUser = asyncHandler(async (req, res) => {
  // console.log("ID ", req.user._id);
  const user = await User.findById(req.user._id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "user not founnd" });
  }
});

const createWorkoutTable = asyncHandler(async (req, res) => {
  const { userId, numRow, numCol, data: rawData, date, bodyPart } = req.body;
  console.log(req.body);
  console.log(rawData);
  function transformData() {
    return rawData.slice(1).map((row) => ({
      action: row[0],
      sets: row.slice(1, -1),
    }));
  }

  const data = transformData();
  console.log("DATA:", data);
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

module.exports = { updateUser, currentUser, uploadAvatar, createWorkoutTable };
