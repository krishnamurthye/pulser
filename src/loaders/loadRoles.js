const fs = require('fs');
const path = require('path');
const { userRole } = require('../models');  // Adjust the path if necessary

let userRoles = [];
async function loadUserRoles() {
  try {
    const filePath = path.join(__dirname, '../../config/role.json'); // Adjust the path if necessary
    userRoles = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    console.log(" userRole-> ", userRoles);
    
    for (const role of userRoles) {
      await userRole.findOrCreate({
        where: { id: role.id },
        defaults: {
          roleName: role.roleName,
        }
      });
    }

    console.log('User roles have been loaded');
  } catch (error) {
    console.error('Error loading User roles:', error);
  } 
}

function getUserRoles() {
    return userRoles;
}

module.exports = { loadUserRoles , getUserRoles };