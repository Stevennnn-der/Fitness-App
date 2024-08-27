const express = require("express");
const multer= require('multer');
const {
  currentUser,
  uploadAvatar,
  updateUser,
  createWorkoutTable,
  generateAIText,
} = require("../controllers/homepageControllers");
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

router.get("/", validateToken, currentUser);

router.post("/suggestion", generateAIText)

router.put("/user", updateUser);

router.post("/user", upload.single('file'), uploadAvatar);

router.post("/workout/:date", createWorkoutTable);

module.exports = router;