const fs = require("fs");
const path = require("path");

let userTypes = [];

function loadUserTypes() {
  // Check if userTypes is already loaded
  if (userTypes.length === 0) {
    const filePath = path.join(__dirname, "../../config/userTypes.json");
    try {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      userTypes = data; // Assign data to userTypes
      console.log("User types loaded successfully.");
    } catch (error) {
      console.error("Error loading userTypes.json:", error);
    }
  } else {
    console.log("User types already loaded.");
  }
}


function getUserTypes() {
  return userTypes;
}

function getUserTypeById(id) {
  loadUserTypes();
  return userTypes.find(
    (userType) => userType.id === id || userType.name === id
  );
}

function getUserTypeByName(name) {
  loadUserTypes();
  return userTypes.find((userType) => userType.name === name);
}

module.exports = {
  loadUserTypes,
  getUserTypes,
  getUserTypeById,
  getUserTypeByName,
};
