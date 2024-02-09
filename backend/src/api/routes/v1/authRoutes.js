const express = require('express');
const router = express.Router();
const { login } = require('../../controllers/authControllers');

// Route for user login
router.post('/login', async (req, res) => {
    try {
        const result = await login(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
