const fs = require("fs");
const path = require("path");

let userTypes = [];

function loadUserTypes() {
  const filePath = path.join(__dirname, "../../config/userTypes.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  this.userTypes = data;
}

function getUserTypes() {
  return this.userTypes;
}

function getUserTypeById(id) {
  return this.userTypes.find(
    (userType) => userType.id === id || userType.name === id
  );
}

function getUserTypeByName(name) {
  loadUserTypes();
  return this.userTypes.find((userType) => userType.name === name);
}

module.exports = {
  loadUserTypes,
  getUserTypes,
  getUserTypeById,
  getUserTypeByName,
};
