

const jwt = require('jsonwebtoken');

const generateToken = async(user) => {

    return jwt.sign({ user: { id: user.id, role: user.role } }, process.env.JWT_SECRET, { expiresIn: '1h' });

}


const verifyToken = async(token) => {
    console.log("verify the token: "+ token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded: "+ decoded + decoded.user);

    return decoded;

}

module.exports = { generateToken, verifyToken }