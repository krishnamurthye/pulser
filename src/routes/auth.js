// src/routes/auth.js

const express = require("express");
const { appUser, authentication, sequelize } = require("../models");
const { loadUserRoles, getUserRoles } = require("../loaders/loadRoles");
const { hashPassword, comparePassword } = require("../util/passwordUtil");
const generateToken = require("../middleware/tokenGenerator");
const {
  getUserTypes,
  getUserTypeById,
  loadUserTypes,
  getUserTypeByName,
} = require("../util/loadUserTypes");
const {
  DISALLOWED_USER_TYPES_BY_NAMES,
  DISALLOWED_ROLES_BY_NAMES,
} = require("../../config/constants");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      role,
      phoneNumber,
      email,
      password,
      userType,
    } = req.body;

    // Check if username already exists
    const existingUser = await appUser.findOne({ where: { email: email } });
    if (existingUser) {
      return res
        .status(500)
        .json({ error: "User with this email already exists" });
    }

    let userTypeFromConfig = "";
    try {
      const userTypeName = getUserTypeByName(userType);
      const userTypeId = parseInt(userTypeName.id); // Convert role to an integer

      userTypeFromConfig = getUserTypeById(userTypeId);
      console.log("userTypeFromConfig", userTypeFromConfig);
      if (!userTypeFromConfig) {
        console.error(
          "userType does not exists",
          userTypeId,
          userTypeFromConfig
        );
        return res.status(500).json({ error: "Invalid request 001" });
      }

      if (DISALLOWED_USER_TYPES_BY_NAMES.includes(userTypeFromConfig.name)) {
        console.error("userType is not allowed", role);
        return res.status(500).json({ error: "Invalid request 002" });
      }
    } catch (error) {
      console.error("userType parsing issue", error);
      return res.status(500).json({ error: "Invalid request 003" });
    }

    try {
      const roles = getUserRoles();
      console.log(" *** roles ** ", roles);
      if (roles.length === 0) {
        // Call the load method
        console.log("reloading the user roles");
        await loadUserRoles();
      }
      const roleId = parseInt(role); // Convert role to an integer
      const validRole = roles.find((r) => r.id === roleId);

      if (!validRole || DISALLOWED_ROLES_BY_NAMES.includes(validRole.name)) {
        console.error("role does not exists", role, validRole);
        return res.status(500).json({ error: "Invalid request 004" });
      }

      if (userTypeFromConfig.name !== validRole.name) {
        console.error(
          "role and userType is not matching",
          userTypeFromConfig.name,
          validRole.name
        );
        return res.status(500).json({ error: "Invalid request 005" });
      }
    } catch (error) {
      console.error("role parsing issue", error);
      return res.status(500).json({ error: "Invalid request 0055" });
    }

    // Create a new user
    const newUser = await appUser.create({
      firstName,
      lastName,
      email,
      role,
      phoneNumber,
      userType: this.userTypeId,
    });

    //console.log("input hashed password:" + password);

    const hashedPassword = await hashPassword(password, email);
    //console.log("Double hashed password:" + hashedPassword);

    // Create authentication record
    await authentication.create({
      auth_user_id: newUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: hashedPassword,
    });

    console.log(" User has been registerd successfully");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(" error in registration", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await appUser.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Find the user by email
    const auth1 = await authentication.findOne({
      where: { auth_user_id: user.id },
    });
    if (!auth1) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(
      password,
      email,
      auth1.password
    );
    if (!isPasswordValid) {
      console.log("incorrect password: ", password, auth1.password);
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate JWT token
    const token = await generateToken(user);

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
