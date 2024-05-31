const fs = require('fs');
const path = require('path');

let userTypes = [];

function loadUserTypes() {
    const filePath = path.join(__dirname, '../../config/userTypes.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    userTypes = data;
}

function getUserTypes() {
    return userTypes;
}

function getUserTypeById(id) {
    return userTypes.find(userType => userType.id === id);
}

module.exports = {
    loadUserTypes,
    getUserTypes,
    getUserTypeById,
};
