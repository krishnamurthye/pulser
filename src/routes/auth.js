
// src/routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const { appUser, authentication, sequelize} = require('../models');
const { loadUserRoles, getUserRoles } = require('../loaders/loadRoles');

const router = express.Router();


router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, role, phoneNumber, email, password } = req.body;

    // Check if username already exists
    const existingUser = await appUser.findOne({ where: { email:email } });
    if (existingUser) {
      return res.status(500).json({ error: 'User with this email already exists' });
    }

    // Roles that are not allowed for registration (based on their IDs)
    const disallowedRoleIds = [2, 4, 5]; // IDs of roles that are not allowed

    if (disallowedRoleIds.includes(role)) {
      console.error("role is not allowed", role)
      return res.status(500).json({ error: 'Invalid request' });
    }

    const roles = getUserRoles();
    console.log(" *** roles ** ", roles);

    try{
      const roleId = parseInt(role); // Convert role to an integer
      const validRole = roles.find((r) => r.id === roleId);

      if (!validRole) {
        console.error("role does not exists", role, validRole)
        return res.status(500).json({ error: 'Invalid request' });
      }
    } catch(error){
      console.error("role parsing issue",error);
      return res.status(500).json({ error: 'Invalid request' });
    }
    

    // Create a new user
    const newUser = await appUser.create({ firstName, lastName, email, role, phoneNumber });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create authentication record
    await authentication.create({
      auth_user_id: newUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: hashedPassword
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(" error in registration", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
