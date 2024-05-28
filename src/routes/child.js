// routes/child.js

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/session');
const childController = require('../controllers/childController');

// Route to add a new child under an existing parent
router.post('/add/child', authenticateToken, childController.addChild);
router.get('/list/child', authenticateToken, childController.listChild);

module.exports = router;
