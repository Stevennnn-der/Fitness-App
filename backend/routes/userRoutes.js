const express = require("express");
const multer= require('multer');
const {
  registerUser,
  loginUser,
  currentUser,
  uploadAvatar,
  updateUser,
  createWorkoutTable,
} = require("../controllers/userControllers");
const validateToken = require("../middleware/validTokenHandler");

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.get("/homepage", validateToken, currentUser);

router.put("/homepage/user", updateUser);

router.post("/homepage/user", upload.single('file'), uploadAvatar);

router.post("/homepage/workout/:date", createWorkoutTable);

module.exports = router;
