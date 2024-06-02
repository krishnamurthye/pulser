// routes/child.js

const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const authenticateToken = require("../middleware/session");
const messagesController = require("../controllers/messagesController");

// Route to add a new child under an existing parent
router.get("/list/messages", authenticateToken, messagesController.getMessages);
router.post(
  "/create/message",
  authenticateToken,
  upload.single("attachment"),
  messagesController.createMessage
);

module.exports = router;
