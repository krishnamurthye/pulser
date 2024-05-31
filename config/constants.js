//config/constants.js
const CHILD = "child";
const ADMIN = "admin";
const COUNCILLOR = "councillor";
const PARENT = "parent";
const LSA = "lsa";

module.exports = {
    CHILD,
    ADMIN,
    COUNCILLOR,
    PARENT,
    LSA,
    DISALLOWED_USER_TYPES_BY_NAMES: [CHILD, ADMIN, COUNCILLOR],
    DISALLOWED_ROLES_BY_NAMES: [CHILD, ADMIN, COUNCILLOR],
    JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key',
    SALT_ROUNDS: 10,
};