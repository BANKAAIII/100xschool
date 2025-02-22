const { Assignment, Class, User } = require("../../../db");
const splitToken = require("../../utils/splitToken");
const verifyToken = require("../../utils/tokenVerify");
const key_jwt = process.env.KEY_JWT;

async function createAssignmentHandler(req, res) {
    try {
        const { title, content } = req.body; // Fix content key case

        const userToken = req.headers['authorization'];
        const classToken = req.headers['classtoken'];

        console.log(classToken);
        console.log(userToken);

        // Extract actual token values
        const userTokenValue = splitToken(userToken);
        const classTokenValue = splitToken(classToken);

        // Verify tokens
        const decodedUser =await  verifyToken(userTokenValue,key_jwt);
        const decodedClass =await verifyToken(classTokenValue,key_jwt);

        if (!decodedUser || !decodedClass) {
            return res.status(400).json({
                success: false,
                location: "Create Assignment Handler",
                message: "Token verification failed",
            });
        }

        const userId = decodedUser.id;
        const classId = decodedClass.classId;

        console.log(decodedUser);
        console.log(decodedClass);

        // Verify if user exists
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                location: "Create Assignment Handler - User Lookup",
                message: "User does not exist",
            });
        }

        // Check to see if user is a professor
        if(decodedUser.role !== "professor"){
            return res.status(400).json({
                success:false,
                message:"Student Users arent allowed to create assignments"
            })
        }

        const existingClass = await Class.findById(classId);
        if (!existingClass) {
            return res.status(400).json({
                success: false,
                location: "Create Assignment Handler - Class Lookup",
                message: "Class does not exist",
            });
        }

        const newAssignment = await Assignment.create({
            creatorId: userId,
            classId: classId,
            title: title,
            content: content,
            status: false
        });

        if (!newAssignment) {
            return res.status(500).json({
                success: false,
                location: "Create Assignment Handler - Assignment Creation",
                message: "Assignment creation failed",
            });
        }

        console.log("Assignments : ", Assignment);

        return res.status(201).json({
            success: true,
            message: "Assignment created successfully!",
            assignment: newAssignment,
        });
    } catch (error) {
        console.error("Error in createAssignmentHandler:", error);
        return res.status(500).json({
            success: false,
            location: "Create Assignment Handler - Exception",
            message: "Internal server error",
            error: error.message,
        });
    }
}

module.exports = createAssignmentHandler;
