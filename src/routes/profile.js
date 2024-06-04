// src/routes/profile.js
const express = require("express");
const {
  getProfile,
  updateProfile,
  addWorkExperience,
} = require("../controllers/profileController");
const authenticateToken = require("../middleware/session");
const upload = require("../middleware/upload");
const router = express.Router();

// Update user profile
// router.put('/update', authenticateToken, updateUserProfile);
router.get("/", authenticateToken, getProfile);
router.post("/", authenticateToken, upload.single("cv"), updateProfile);
router.post("/workExperience/add", authenticateToken, addWorkExperience);

module.exports = router;
