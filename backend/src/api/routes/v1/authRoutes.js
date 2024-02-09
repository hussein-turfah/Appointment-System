const express = require('express');
const router = express.Router();
const { login , forgotPassword } = require('../../controllers/authControllers');

// Route for user login
router.post('/login', login);
router.post('/forgetpassword',forgotPassword)

module.exports = router;
