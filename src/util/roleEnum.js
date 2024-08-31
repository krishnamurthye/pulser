

    // { "id": 1, "name": "parent" },
    // { "id": 2, "name": "lsa" },
    // { "id": 3, "name": "admin" },
    // { "id": 4, "name": "councillor" }

    // [
    //     { "id": 1, "name": "parent" },
    //     { "id": 2, "name": "child" },
    //     { "id": 3, "name": "lsa" },
    //     { "id": 4, "name": "admin" },
    //     { "id": 5, "name": "councillor" }
    // ]
      

// const { CHILD , ADMIN ,COUNCILLOR ,PARENT, LSA } = require("../../config/constants");


// Define the enum for user roles
const UserRolesEnum = {
  PARENT: { id: 1, name: "parent" },
  CHILD: { id: 2, name: "child" },
  LSA: { id: 3, name: "lsa" },
  ADMIN: { id: 4, name: "admin" },
  COUNCILLOR: { id: 5, name: "councillor" },
};

// Convert the enum into an array of roles
const userRoles = Object.values(UserRolesEnum);

function getUserRoles() {
  return userRoles;
}

// Function to return the matching enum object by role name
function getRoleByName(roleName) {
    console.log(roleName)
    return userRoles.find(role => role.name.toLowerCase() === roleName.toLowerCase()) || null;
  }

module.exports = { getUserRoles, getRoleByName };