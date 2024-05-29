// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const { User, appUser } = require("../models");

const authenticateToken = async (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1]; // More defensive

  if (!token) {
    return res.sendStatus(401); // Unauthorized: No token provided
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.authUser = await appUser.findByPk(decoded.user.id);
    if (!req.authUser) {
      return res.sendStatus(401); // Unauthorized: User not found
    }
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.sendStatus(403); // Forbidden: Token invalid or expired
  }
};

module.exports = authenticateToken;
