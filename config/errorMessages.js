module.exports = {
    CHILD:"child",
    ADMIN:"admin",
    COUNCILLOR:"councillor",
    PARENT:"parent",
    LSA:"lsa",
    DISALLOWED_USER_TYPES_BY_NAMES:["child", "admin", "councillor"],
    DISALLOWED_ROLES_BY_NAMES:["child", "admin", "councillor"],
    JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key',
    SALT_ROUNDS: 10,  
};