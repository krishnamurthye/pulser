// routes/child.js

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/session');
const valueController = require('../controllers/valuesController');

// Route to add a new child under an existing parent
router.get('/list/schoolsList', authenticateToken, valueController.getSchoolList);
router.get('/list/schoolSystemsList', authenticateToken, valueController.getSchoolSystemList);
router.get('/list/needLevelList', authenticateToken, valueController.getNeedLevelList);
router.get('/list/gradesList', authenticateToken, valueController.getGardesList);



module.exports = router;
