const {User,Class} = require("../../../db");
const key_jwt = process.env.KEY_JWT;
const jwt = require("jsonwebtoken");

// Authenticate the user credentials form his token.
// Find a class with required credentials and delete.

async function deleteClass( req,res ){
    const ClassName = req.body.ClassName;
    const profPassword = req.body.profPassword;

    const token = req.headers['authorization'];

    console.log("checkpoint 1")

    if(!token){
        return res.status(400).json({
            success:false,
            message:"ClassCreation failed"
        });
    }

    const tokenWithoutBearer = token.startsWith('Bearer ')? token.slice(7,token.length) : token;

    const decoded = jwt.verify(tokenWithoutBearer,key_jwt);
    if(!decoded){ 
        return res.status(400).json({
            success:false,
            message:"Token Decode failed"
        })
    }

    
    console.log("the token is verified");
    console.log(decoded.ipAddress);
    console.log(ClassName);

    const classroom = await Class.findOneAndDelete({
        name: ClassName,
        creatorIp: decoded.ipAddress,
        profPassword: profPassword
    });
    
    if(!classroom){
        return res.status(400).json({
            success:false,
            message:"Failed to delete classroom"
        })
    }

    return res.status(200).json({
        success:true,
        message:"The class is successfully deleted!"
    })

}

module.exports = deleteClass;