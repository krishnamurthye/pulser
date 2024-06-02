const multer = require("multer");

const storage = multer.memoryStorage(); // Store files in memory as Buffer objects
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB size
});

module.exports = upload;
