const crypto = require('crypto');

// Derive a consistent salt from the email
function deriveSalt(email) {
    return crypto.createHash('sha256').update(email).digest('hex');
}

// Hash the password with the derived salt using SHA-256
function hashPassword(password, email) {
    const salt = deriveSalt(email);
    const hash = crypto.createHash('sha256').update(password + salt).digest('hex');
    // console.log(" passwordUtil hashPassword: " + password + " " + email + " " + salt + " " + hash);
    return hash;
}

// Compare the password with the stored hash
function comparePassword(password, email, hash) {
    const salt = deriveSalt(email);
    const passwordHash = crypto.createHash('sha256').update(password + salt).digest('hex');
    return passwordHash === hash;
}

module.exports = { hashPassword, comparePassword };