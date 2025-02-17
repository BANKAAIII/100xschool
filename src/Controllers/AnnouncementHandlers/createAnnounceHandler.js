const { Announcement, User } = require("../../../db");
const  splitToken = require("../../utils/splitToken");
const tokenVerify = require("../../utils/tokenVerify");

const key_jwt = process.env.KEY_JWT;

async function createAnnouncementHandler( req,res ){

    const content = req.body.content;

    const token = req.headers['authorization']; 
    const classToken = req.headers['classtoken']; 

    // seperate the bearer from the tokens if present

    console.log("token :",token);
    console.log("classToken :",classToken);

   const tokenWithoutBearer= splitToken(token);
   const classTokenWithoutBearer = splitToken(classToken);

    const decodedToken =await tokenVerify(tokenWithoutBearer,key_jwt);
    const decodedClassToken =await tokenVerify(classTokenWithoutBearer,key_jwt);

    console.log("decodedClassToken : ",decodedClassToken);
    console.log("decodedtoken :", decodedToken);

    const userId = decodedToken.userId;
    const classId = decodedClassToken.classId;

    console.log("decoded userID", userId);
    console.log("decoded classID", classId);


    // First Add an announcement in announcement table and then update the user table too


    const createAnnounce = await Announcement.create({
        creator:userId,
        classId:classId,
        content:content
    });

    const announcementId = createAnnounce._id;
    
    if(!createAnnounce){
        return res.status(400).json({
            success:false,
            msg:"Failed to create Announcement"
        })
    }

   
    

   return res.status(200).json({
    success:true,
    token:token
   })
    

} 

module.exports = createAnnouncementHandler