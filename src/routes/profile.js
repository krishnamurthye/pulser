// src/routes/profile.js
const express = require('express');
const { updateUserProfile } = require('../controllers/profileController');
const authenticateToken = require('../middleware/session');
const router = express.Router();

// Update user profile
router.put('/update', authenticateToken, updateUserProfile);

module.exports = router;
