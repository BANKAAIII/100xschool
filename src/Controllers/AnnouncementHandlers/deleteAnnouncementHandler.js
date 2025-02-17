const { log } = require("console");
const { Announcement, User } = require ("../../../db");
const splitToken = require("../../utils/splitToken");
const tokenVerify = require("../../utils/tokenVerify");


const key_jwt = process.env.KEY_JWT;

async function deleteAnnouncementHandler( req,res ){
    
    const announcementId = req.body.id;

    const token = req.headers['authorization'];
    const classToken = req.headers['classtoken'];

    console.log("token :", token);
    console,log("classtoken : ",classToken);

    const tokenWithoutBearer= splitToken(token);
   const classTokenWithoutBearer = splitToken(classToken);

   if( !tokenWithoutBearer | !classTokenWithoutBearer){
    return res.status(400).json({
        success:false,
        message:"splitting of tokens failed!"
    })
   }

    const decodedToken =await tokenVerify(tokenWithoutBearer,key_jwt);
    const decodedClassToken =await tokenVerify(classTokenWithoutBearer,key_jwt);

    
    console.log("decodedClassToken : ",decodedClassToken);
    console.log("decodedtoken :", decodedToken);


    const userId = decodedToken.userId;
    const classId = decodedClassToken.classId;
    
    const deleting = await Announcement.findOneAndDelete({
        creator:userId,classId:classId,
        _id:announcementId
    })

    if(!deleting){
        return res.status(400).json({
            status:false,
            msg:"find and delete block failed!"
        })
    }

    return res.status(200).json({
        status:true,
        msg:"user deleted successfully"
    })

}

module.exports = deleteAnnouncementHandler;