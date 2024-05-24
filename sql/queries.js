const LOGIN_SELECT_ALL_USERS = "SELECT * FROM users";
const REGISTRATION_ADD_USER =
  "INSERT INTO users (id, firstName, lastName, dob, nationality, phoneNumber, role, created_at, parentId, userType, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
const PARENT_ADD_CHILD =
  "INSERT INTO users (firstName, lastName, role, created_at, parentId, userType, phoneNumber, dob, isActive, nationality) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

const PARENT_GET_ALL_CHILDREN = "SELECT * FROM children WHERE parentId = ?";

module.exports = {
  LOGIN_SELECT_ALL_USERS,
  REGISTRATION_ADD_USER,
  PARENT_ADD_CHILD,
  PARENT_GET_ALL_CHILDREN,
};
