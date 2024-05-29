

const jwt = require('jsonwebtoken');

const generateToken = async(user) => {

    return jwt.sign({ user: { id: user.id, role: user.role } }, process.env.JWT_SECRET, { expiresIn: '1h' });

}

module.exports = generateToken;