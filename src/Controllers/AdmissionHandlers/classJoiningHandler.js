const express = require('express');
const jwt = require("jsonwebtoken");
const { User, Class } = require("../../../db");
const key_jwt = process.env.KEY_JWT;

async function classJoining(req, res) {
    const token = req.headers['authorization'];
    const { ClassName, password } = req.body;  // Single password input

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Token not found"
        });
    }

    // Remove "Bearer " prefix if present
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    let decoded;
    try {
        decoded = jwt.verify(tokenWithoutBearer, key_jwt);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid token"
        });
    }

    const role = decoded.role;
    const userId = decoded.userId;

    console.log("userID: ",userId);

    // Determine which password field to use
    const passwordField = role === "student" ? "studentPassword" : "profPassword";
   
    // Attempt to find and update the class in one operation
    const classData = await Class.findOneAndUpdate(
        { name: ClassName, [passwordField]: password },
        { $addToSet: { members: userId } },  // Prevent duplicate members
        { new: true }
    );

        const classId = classData._id;
        console.log("classID :",classId);

    if (!classData) {
        return res.status(400).json({
            success: false,
            message: "Class does not exist or incorrect password"
        });
    }

    // Generate a class token
    try {
        const classToken = jwt.sign(
            { ClassName,classId, role, password },
            key_jwt
        );
        console.log(classToken);

        return res.status(200).json({
            success: true,
            message: "You successfully joined the class",
            token:classToken
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Class token creation failed",
            error: error.message
        });
    }
}

module.exports = classJoining;

