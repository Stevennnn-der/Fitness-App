const express = require('express');
const { registerUser, loginUser, currentUser, userInfo, updateUser } = require('../controllers/userControllers');
const validateToken = require('../middleware/validTokenHandler');

const router = express.Router();

router.post('/signup', registerUser);

router.post('/login', loginUser);

router.get('/homepage', validateToken, currentUser);

router.put('/homepage/user', updateUser);

module.exports = router;