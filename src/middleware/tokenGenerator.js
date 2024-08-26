
const jwt = require('jsonwebtoken');

const generateToken = async(user) => {
    return jwt.sign(
        { user: { id: user.id, role: user.role } },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

const verifyToken = async(token) => {
    try {
        console.log("Verifying the token: " + token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token: ", decoded);
        return decoded;
    } catch (error) {
        console.error("Error verifying token:", error.message);
        // Handle specific token errors
        if (error.name === 'TokenExpiredError') {
            //throw new Error("Token has expired. Please request a new one.");
            return false;
        } else if (error.name === 'JsonWebTokenError') {
            //throw new Error("Invalid token. Please check the token and try again.");
            return false;
        } else {
            //throw new Error("An error occurred while verifying the token.");
            return false;
        }
    }
}


module.exports = { generateToken, verifyToken }