const {Announcement} = require("../../../db");
const splitToken = require("../../utils/splitToken");
const tokenVerify = require("../../utils/tokenVerify");

const key_jwt = process.env.KEY_JWT;

async function getAllAnnouncementHandler(req,res){
    const classToken = req.headers['authorization'];
    console.log("classtoken :", classToken);


   const classTokenWithoutBearer = splitToken(classToken);
   const decodedClassToken =await tokenVerify(classTokenWithoutBearer,key_jwt);

   console.log("decodedClassToken : ",decodedClassToken);
   const classId = decodedClassToken.classId;

   const announcements = await Announcement.find({
    classId:classId
   })

   if(!announcements){
    return res.status(400).json({
        success:false,
        msg:"Failed to get all Announcements"
    })
   }

   return res.status(200).json({
    success:true,
    announcements:announcements
   })

}

module.exports = getAllAnnouncementHandler;
