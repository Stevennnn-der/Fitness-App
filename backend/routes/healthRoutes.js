const express = require("express");

const {
  setGoalWeight, 
  updateUserWeight
} = require("../controllers/healthControllers");

const router = express.Router();

router.post("/weight", updateUserWeight);

router.post("/weight/goal", setGoalWeight);

router.post("/sleep");

module.exports = router;
