const LOGIN_SELECT_ALL_USERS = "SELECT * FROM users WHERE username = ?";
const REGISTRATION_ADD_USER =
  "INSERT INTO users (username, email, password, phoneNumber, role) VALUES (?, ?, ?, ?, ?)";
const PARENT_ADD_CHILD = `
        INSERT INTO children (firstname, lastname, dob, school, grade, needLevel, age, additionalInformation, userId)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

const PARENT_GET_ALL_CHILDREN = "SELECT * FROM children WHERE username = ?";

module.exports = {
  LOGIN_SELECT_ALL_USERS,
  REGISTRATION_ADD_USER,
  PARENT_ADD_CHILD,
  PARENT_GET_ALL_CHILDREN,
};
