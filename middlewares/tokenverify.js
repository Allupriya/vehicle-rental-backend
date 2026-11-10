
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const { BLACKLIST } = require("./constant");

const verifylogintoken = (req, res, next) => {
    const requestPath = req.path;
    const authheader = req.headers.authorization;

    // Allow public endpoints
    if (BLACKLIST.includes(requestPath)) {
        return next();
    }

    // Check whether Authorization header exists
    if (!authheader || !authheader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "header missing"
        });
    }

    // Extract JWT
    const token = authheader.split(" ")[1];

    try {
        const decode = jwt.verify(token, SECRET_KEY);

        req.user = decode;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = { verifylogintoken };