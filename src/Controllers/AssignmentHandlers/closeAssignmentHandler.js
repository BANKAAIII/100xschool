

const { Assignment, Class, User } = require("../../../db");
const splitToken = require("../../utils/splitToken");
const verifyToken = require("../../utils/tokenVerify");
const key_jwt = process.env.KEY_JWT;

// token verification 
// find and check the status of the assignment
// check false if not already.

async function closeAssignmentHandler( req,res ){

    const  title  = req.body.title;
    
    const userToken = req.headers['authorization'];
    const classToken = req.headers['classtoken'];

    const userTokenValue = splitToken(userToken);
    const classTokenValue =  splitToken(classToken);

    const decodedUser =await verifyToken(userTokenValue,key_jwt);
    const decodedClass=await verifyToken(classTokenValue,key_jwt);

    if(!decodedUser || !decodedClass){
        return res.status(400).json({
            success:false,
            location:"closeAssignmentHandler ",
            message:"token Decoding failed"
        })
    }

    const userId = decodedUser.id;
    const classId = decodedClass.classId;

    console.log("decoded User :", decodedUser);
    console.log("decoded Class", decodedClass);

    const existingUser = await User.findById(userId);
    const existingClass = await Class.findById(classId);

    console.log(1);
    if(!existingClass){
        return res.status(400).json({
            success:false,
            locaiton:"close AssignmentHandler",
            message:"failed to find existing class from the decoded token"
        })
    }

    console.log(2);
    if(!existingUser){
        return res.status(400).json({
            success:false,
            locaiton:"close AssignmentHandler",
            message:"failed to find existing user/class from the decoded token"
        })
    }

    console.log(3);
    if(decodedUser.role !== "professor"){
        return res.status(400).json({
            success:false,
            locaiton:"closeAssignmentHandler",
            message:"Students dont have authority to close assignments"
        })
    }

    console.log(4);
    console.log("userId:",userId);
    console.log("classId:",classId);
    console.log("title:",title);

    const assignment = await Assignment.findOne({
        creatorId:userId,
        classId:classId,
        title:title
    });

    if(!assignment){
        return res.status(400).json({
            success:false,
            location:"closeAssignmentHandler",
            message:"failed ot find assignment"
        })
    }
        assignment.status = false ;

        console.log("status", assignment.status);
        
        return res.status(200).json({
            success:true,
            message:"assignment closed successfully"
        })
}

module.exports = closeAssignmentHandler;