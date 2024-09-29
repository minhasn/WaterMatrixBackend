const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
// router.post('/send-otp', userController_1.sendOtp);
// router.post('/verify-otp', userController_1.verifyOtp);
module.exports = router;
