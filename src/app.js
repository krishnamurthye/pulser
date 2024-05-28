//app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const { sequelize } = require("./models");
const { loadUserRoles, getUserRoles } = require("./loaders/loadRoles");
const profileRoutes = require("./routes/profile");
const parentRoutes = require("./routes/child");

let isServerUp = false;

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/parent", parentRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await sequelize.sync(); // Sync all models
    console.log("Database & tables created!");

    console.log("load user roles");
    await loadUserRoles();

    console.log("loaded");
    isServerUp = true;
  } catch (error) {
    console.error("Unable to sync database:", error);
  }
});

function isServerReady() {
  return isServerUp;
}

module.exports = { app, server, isServerReady };
