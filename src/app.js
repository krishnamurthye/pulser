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
const { loadSchoolsList, loadSchoolsSystem } = require('./loaders/loadData');
const lsaRequestRoutes = require('./routes/lsaRequest');
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
app.use('/api/lsaRequest', lsaRequestRoutes);


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await sequelize.sync(); // Sync all models
    console.log("Database & tables created!");

      console.log('load user roles');
      await loadUserRoles();

      loadSchoolsList();
      console.log('loaded SchoolsList');


      loadSchoolsSystem();
      console.log('loaded SchoolsSystem');

      console.log('loaded');
      isServerUp = true;
    } catch (error) {
      console.error('Unable to sync database:', error);
    }
  });

function isServerReady() {
  return isServerUp;
}

module.exports = { app, server, isServerReady };
