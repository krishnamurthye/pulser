// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { User, appUser } = require('../models');

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.authUser = await appUser.findByPk(decoded.userId);
    if (!req.authUser) return res.sendStatus(401);
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports = authenticateToken;
