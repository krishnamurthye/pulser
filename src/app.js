//app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const { sequelize } = require('./models');
const { loadUserRoles, getUserRoles } = require('./loaders/loadRoles');
const profileRoutes = require('./routes/profile');
const parentRoutes = require('./routes/child');
const valueRoutes = require('./routes/value');
const { loadUserTypes } = require('./util/loadUserTypes');
const lsaRequestRoutes = require('./routes/lsaRequest');
const messageRoutes = require("./routes/message");
const { 
  loadSchoolsList, 
  loadSchoolsSystem, 
  loadEducation, 
  loadSpecialization,
  loadNeedLevels,
  loadGrades 
} = require('./loaders');


const cors = require("cors");

let isServerUp=false;

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/values", valueRoutes);
app.use("/api/lsaRequest", lsaRequestRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
      await sequelize.sync(); // Sync all models
      console.log("Database & tables created!");

      console.log('Loading user types');
      loadUserTypes();  // Load user types into memory
      console.log('User types loaded');

      console.log('load user roles');
      await loadUserRoles();

      loadSchoolsList();
      console.log('loaded SchoolsList');

      loadSchoolsSystem();
      console.log('loaded SchoolsSystem');

      console.log('Loading Education');
      loadEducation();  // Load into memory
      console.log('Education loaded');

      console.log('Loading Specialization');
      loadSpecialization();  // Load into memory
      console.log('Specialization loaded');

      console.log('Loading Specialization');
      loadSpecialization();  // Load into memory
      console.log('Specialization loaded');

      console.log('Loading NeedLevels');
      loadNeedLevels();  // Load into memory
      console.log('NeedLevels loaded');

      console.log('Loading Grades');
      loadGrades()
      console.log('Grades loaded');

      console.log('loaded');
      isServerUp = true;
      console.log('************* Server Started *************');

    } catch (error) {
      console.error('Unable to sync database:', error);
    }
  });

function isServerReady() {
  return isServerUp;
}

module.exports = { app, server, isServerReady };
