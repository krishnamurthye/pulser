const LOGIN_SELECT_ALL_USERS = "SELECT * FROM users WHERE username = ?";
const REGISTRATION_ADD_USER =
  "INSERT INTO users (username, email, password, phoneNumber, role) VALUES (?, ?, ?, ?, ?)";

module.exports = {
  LOGIN_SELECT_ALL_USERS,
  REGISTRATION_ADD_USER,
};
