// First check if the asiignment is open
// If yes then delete the entry 
// students are only allowed to edit/delete their assignments when the assignments are open

const { user } = require("pg/lib/defaults");
const { Assignment, Class, User } = require("../../../db");
const splitToken = require("../../utils/splitToken");
const verifyToken = require("../../utils/tokenVerify");
const key_jwt = process.env.KEY_JWT;

async function deleteAssignmentHandler( req,res ){
    const title = req.body.title;

    const userToken = req.headers['authorization'];
    const classToken = req.headers['classtoken'];

    const userTokenValue = splitToken(userToken);
    const classTokenValue = splitToken(classToken);

    const decodedUser = await verifyToken(userTokenValue,key_jwt);
    const decodedClass= await verifyToken(classTokenValue,key_jwt);

    if(!decodedUser || !decodedClass){
        return res.status(400).json({
            success:false,
            location:"delete Assignment Handelr",
            message:"failed to decode the user/class"
        })
    }

    const userId = decodedUser.id;
    const classId = decodedClass.classId;

    console.log("decodedUser");
    console.log("decodedClass");

    const existingUser = await User.findById(userId);
    const existingClass = await Class.findById(classId);

        if(!existingUser){
            return res.status(400).json({
                success:false,
                location:"deleteAssignmentHandler",
                message:"user dosent exist in the database"
            })
        }

        if(!existingClass){
            return res.status(400).json({
                success:false,
                location:"deleteAssignmentHandler",
                message:"class dosent exist in the database"
            })
        }

    const assignment = await Assignment.findOneAndDelete({
        creatorId:userId,
        classId:classId,
        title:title
    })    

    if(!assignment){
        return res.status(400).json({
            success:false,
            location:"deleteAssignmentHandler",
            message:"assignment deletion failed"
        })
    }


    return res.status(200).json({
        success:false,
        message:"Assignment Deletion successfull"
    })
}

module.exports = deleteAssignmentHandler;