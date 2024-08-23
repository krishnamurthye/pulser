// routes/child.js

const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/session");
const childController = require("../controllers/childController");
const valueController = require("../controllers/valuesController");

// Route to add a new child under an existing parent
router.post("/add/child", authenticateToken, childController.addChild);
router.get("/list/child", authenticateToken, childController.listChild);
router.get("/get/child/:childId", authenticateToken, childController.getChild);

module.exports = router;
