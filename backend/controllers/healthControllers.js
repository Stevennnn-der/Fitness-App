const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const updateUserWeight = asyncHandler(async (req, res) => {
  const { userId, weight, currentDate, unit } = req.body;
  // console.log("User", userId);

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  if (user) {
    const existingWeightIndex = user.weights.userWeight.findIndex(
      (weight) => weight.weightDate === currentDate
    );

    const weightInKg = unit === "KG" ? weight : weight * 0.4535;
    const parseWeight = parseFloat(weightInKg);

    if (existingWeightIndex !== -1) {
      user.weights.userWeight[existingWeightIndex].weightInKg = parseWeight;
    } else {
      user.weights.userWeight.push({
        weightDate: currentDate,
        weightInKg: parseWeight,
      });
    }

    try {
      await user.save();
    } catch (error) {
      console.error("Can not save the weight", error)
    }
    return res.status(200).json({
      message: "Weight Saved successfully",
    });
  } else {
    res.status(404).json({ message: "Can Not Find User!" });
  }
});

const setGoalWeight = asyncHandler(async (req, res) => {
  const { userId, goalWeight, unit } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user) {
    const goalWeightInKg = unit === "KG" ? goalWeight : goalWeight * 0.4535;
    const parseWeight = parseFloat(goalWeightInKg);

    user.weights.goalInKg = parseWeight;

    try {
      await user.save();
    } catch (error) {
      console.error("Can not save the weight", error)
    }
    return res.status(200).json({
      message: "Goal Weight Saved successfully",
    });
  } else {
    res.status(404).json({ message: "Can Not Find User!" });
  }
});


module.exports = { setGoalWeight, updateUserWeight };
