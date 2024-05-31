const express = require('express');
const router = express.Router();
const { createLsaRequest, getLsaRequestsByParent } = require('../controllers/lsaRequestController');
const authenticateToken = require('../middleware/session');


// Define the route to create an LSA request
router.post('/create', authenticateToken, createLsaRequest);
router.get('/list', authenticateToken, getLsaRequestsByParent);

module.exports = router;
