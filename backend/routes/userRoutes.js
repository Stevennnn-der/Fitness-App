const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controllers/userControllers');
const validateToken = require('../middleware/validTokenHandler');

const router = express.Router();

router.post('/signup', registerUser);

router.post('/login', loginUser);

router.get('/current', validateToken, currentUser);

//router.post('/homepage/user:id', loginUser);

module.exports = router;