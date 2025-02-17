const express = require("express");
const jwt = require("jsonwebtoken");
const key_jwt = process.env.KEY_JWT;

async function tokenValidator(req, res, next) {
    // Check if the Authorization header exists
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "The token is missing in the request"
        });
    }

    try {
        // Remove 'Bearer ' prefix if present
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

        // Verify the token and extract the role
        const decoded = jwt.verify(tokenWithoutBearer, key_jwt);
        const { role } = decoded;
        console.log(role);  // You can use the role as needed

        next();  // Continue to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
            error: error.message,
        });
    }
}

module.exports = tokenValidator;
