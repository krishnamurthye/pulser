// src/routes/auth.js

const express = require("express");
const { appUser, authentication, sequelize,userRole } = require("../models");
const { loadUserRoles, getUserRoles } = require("../loaders/loadRoles");
const { hashPassword, comparePassword } = require("../util/passwordUtil");
const { generateToken, verifyToken } = require("../middleware/tokenGenerator");
const { sendPasswordResetEmail, sendVerificationCodeEmail, generateVerificationCode } = require("../util/emailUtil"); // Import a utility function for sending emails (if applicable
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

        console.log(firstName,lastName)

        // Check if username already exists
        const existingUser = await appUser.findOne({ where: { email: email } });
        if (existingUser) {
            return res
                .status(500)
                .json({ error: "User with this email already exists" });
        }

        let userTypeFromConfig = "";
        let userTypeId
        try {
            console.log("userType", userType);
            const userTypeName = getUserTypeByName(userType)
            userTypeId = parseInt(userTypeName.id); // Convert userType to an integer

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
            userType: userTypeId,
        });

        //console.log("input hashed password:" + password);

        const hashedPassword = await hashPassword(password, email);
        //console.log("Double hashed password:" + hashedPassword);


        //generate verificationCode
        const verificationCode = generateVerificationCode();

        // Create authentication record
        await authentication.create({
            auth_user_id: newUser.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            password: hashedPassword,
            verifyCode:verificationCode
        });

        // Send verification email with random string
        sendVerificationCodeEmail(email,verificationCode);

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

        // Find the authentication record
        const auth = await authentication.findOne({ where: { auth_user_id: user.id } });
        if (!auth) {
            return res.status(404).json({ message: "Authentication record not found" });
        }

        // Check if user is blocked
        if (auth.blocked) {
            return res.status(403).json({ message: "Your account is blocked due to too many failed login attempts." });
        }

        // Check for forced password reset
        if (auth.forcePasswordReset) {
            return res.status(403).json({ message: "Please reset your password to continue." });
        }

        // Compare passwords
        const isPasswordValid = await comparePassword(password, email, auth.password);
        if (!isPasswordValid) {
            // Increment failed attempts
            await auth.update({ failedAttempts: auth.failedAttempts + 1 });

            // Block the user if failed attempts exceed the threshold
            if (auth.failedAttempts >= 3) {
                await auth.update({ blocked: true });
                return res.status(403).json({ message: "Your account has been blocked." });
            }

            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Reset failed attempts on successful login
        await auth.update({ failedAttempts: 0 });

        // Generate JWT token
        const token = await generateToken(user);

        res.json({ token, user });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post("/request-reset-password", async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists
        const user = await appUser.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a reset token (can be a JWT or a random token stored in DB)
        const resetToken = await generateToken(user, { expiresIn: '1h' }); // Adjust the expiration as needed

        // Save token to the DB or cache for later validation (optional)
        await authentication.update({
                resetToken: resetToken,
                forcePasswordReset: true,
                blocked: false
            }, // Save the reset token
            { where: { auth_user_id: user.id } }
        );

        // Send reset email with token (example, implement `sendResetEmail`)
        await sendPasswordResetEmail(email, resetToken);

        res.status(200).json({ message: "Password reset link sent to email" });
    } catch (error) {
        console.error("Error requesting password reset:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/reset-password", async (req, res) => {
  const { token, confirmPassword } = req.body;

  try {
    // Verify the reset token
    const decodedToken = await verifyToken(token); // Add your JWT token verification logic here

    if (decodedToken === false) {
      return res.status(400).json({ message: "Invalid token or expired reset token link" });
    }

    // Find the user associated with this reset token
    const user = await appUser.findByPk(decodedToken.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the user authentication record
    const auth = await authentication.findOne({
      where: { auth_user_id: user.id },
    });
    if (!auth) {
      return res.status(404).json({ message: "Authentication record not found" });
    }

    // Check if the token matches (if storing it in DB)
    if (auth.resetToken !== token) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(confirmPassword, user.email);

    // Update the password in the database
    await authentication.update(
      {
        password: hashedPassword,
        resetToken: null, // Clear the reset token
        forcePasswordReset: false, // Clear force reset flag
        failedAttempts: 0, // Reset failed attempts
        blocked: false // Unblock the user
      },
      { where: { auth_user_id: user.id } }
    );

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to validate the reset token
router.post("/validate-reset-token", async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the reset token
    const decodedToken = await verifyToken(token);

    if (!decodedToken || decodedToken === false) {
      return res.status(400).json({ message: "Invalid token or expired reset token link" });
    }

    // Find the user associated with this reset token
    const user = await appUser.findByPk(decodedToken.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the user authentication record
    const auth = await authentication.findOne({
      where: { auth_user_id: user.id },
    });
    if (!auth) {
      return res.status(404).json({ message: "Authentication record not found" });
    }

    // Check if the token matches (if storing it in DB)
    if (auth.resetToken !== token) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Token is valid
    res.status(200).json({ message: "Token is valid" });
  } catch (error) {
    console.error("Error validating reset token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST endpoint to verify the code
router.post("/verify-code", async (req, res) => {
  const {  code } = req.body;

  try {
    // Find the user by email
    const user_record = await authentication.findOne({ where: { verifyCode : code } });

    if (!user_record) {
      return res.status(404).json({ message: "User not found" });
    }

    const auth_user = await appUser.findOne({ where: { id : user_record.auth_user_id } })

    // Mark the verification code as used or delete it
    // Update the password in the database
    await authentication.update(
      {
        verifyCode: null,
      },
      { where: { id: user_record.id } }
    );

    // Generate JWT token
    const token = await generateToken(auth_user);

    // Send back the response with token and user object
    res.status(200).json({
      message: "Code verified successfully",
      token,
    });

  } catch (error) {
    console.error("Error verifying code:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/get-profile", async (req, res) => {
  const { token } = req.body;
  console.log(token)

  try {
    // Verify the token to ensure the user is authenticated
    const decodedToken = await verifyToken(token); // Add your JWT token verification logic here

    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Find the user associated with the token
    const user = await appUser.findByPk(decodedToken.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the user authentication record
    const auth = await authentication.findOne({
      where: { auth_user_id: user.id },
    });
    if (!auth) {
      return res.status(404).json({ message: "Authentication record not found" });
    }

    const userType = await userRole.findOne({
      where: { id: user.userType },
    });

    // Construct the profile data to return
    const profile = {
      id: user.id,
      email: user.email,
      blocked: auth.blocked,
      failedAttempts: auth.failedAttempts,
      userType:userType.name,
      name:user.firstName+' '+user.lastName,
      phoneNumber:user.phoneNumber
      // Add any other relevant fields here
    };

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/update-profile", async (req, res) => {
  const { token, phoneNumber, streetAddress, city, postalCode } = req.body;

  try {

    // Verify the token to ensure the user is authenticated
    const decodedToken = await verifyToken(token); // Add your JWT token verification logic here

    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Find the user associated with this token
    const user = await appUser.findByPk(decodedToken.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user profile details
    await appUser.update(
      {
        phoneNumber: phoneNumber,
        streetAddress: streetAddress,
        city: city,
        postalCode: postalCode,
      },
      { where: { id: user.id } }
    );

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;