
// src/routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const { User, Authentication, sequelize} = require('../models');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, role, phoneNumber, username, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ where: { phoneNumber } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this phone number already exists' });
    }

    // Create a new user
    const newUser = await User.create({ firstName, lastName, role, phoneNumber });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create authentication record
    await Authentication.create({
      auth_user_id: newUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      username,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
