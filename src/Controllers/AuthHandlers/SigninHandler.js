const { User } = require('../../../db');

// The request needs to have the credentials: Email || mobileNumber ,Password,role
// ip Address must match with the addresses registered.

const DeviceIpGenerator = require('../AttendanceHandlers/DeviceIpGenerator');
const { Jwt } = require('hono/utils/jwt');
const key_jwt = process.env.KEY_JWT;


async function SigninHandler ( req,res ){

    const firstName = req.body.firstName;
    const ipAddress = DeviceIpGenerator();
    let primaryCred ="";
    const role = req.requestMetadata.role;
    const number = req.body.mobileNumber;
    const password = req.body.password;

    // optional credential
    primaryCred = req.body.email;
    const email = req.body.email;
    if(primaryCred === "" || undefined){
         primaryCred = req.body.mobileNumber
    }

    console.log("userInfo:",{email,role,ipAddress,password,number});

    const existingUser = await User.findOne({
        ipAddress,email,password,role
    })


    if(!existingUser){
        return res.status(400).json({
            success : false,
            message:"User Dosen't exist!!"
        })
    }

    const userId = existingUser._id;
    console.log(existingUser);

    const keyToken =await Jwt.sign({
            userId,firstName,email,password,ipAddress,role
    },key_jwt);

    return res.status(200).json({
        success:true,
        message:"User Signed in successfully!!",
        userInformation:{ existingUser },
        token:keyToken
    })
}

module.exports = SigninHandler;