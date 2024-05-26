
// src/routes/auth.js

const express = require('express');
const { appUser, authentication, sequelize} = require('../models');
const { loadUserRoles, getUserRoles } = require('../loaders/loadRoles');
const { hashPassword, comparePassword } = require('../util/passwordUtil');
const jwt = require('jsonwebtoken');


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
    if (roles.length === 0) {
      // Call the load method
      console.log("reloading the user roles");
      await loadUserRoles();
    }
 

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

    console.log("input hashed password:"+ password);
    // Hash the password
    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await hashPassword(password, email);
    console.log("Double hashed password:"+ hashedPassword);

    // Create authentication record
    await authentication.create({
      auth_user_id: newUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: hashedPassword
    });

    console.log(" User has been registerd successfully");
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(" error in registration", error);
    res.status(500).json({ error: error.message });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Find the user by email
      const user = await appUser.findOne({ where: { email } });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      // Find the user by email
      const auth1 = await authentication.findOne({ where: { auth_user_id: user.id} });
      if (!auth1) {
          return res.status(404).json({ message: 'User not found' });
      }
      
      // Compare passwords
      const isPasswordValid = await comparePassword(password, email, auth1.password);
      if (!isPasswordValid) {
        console.log("incorrect password: ", password, auth1.password);
          return res.status(401).json({ message: 'Invalid credentials' });
      }
      // Generate JWT token
      const token = jwt.sign({ user: { id: user.id, role: user.role } }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      res.json({ token });
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
