const express =require ("express");
const {User} = require('../../../db');
const DeviceIpGenerator = require('../AttendanceHandlers/DeviceIpGenerator');
const  jwt  = require("hono/jwt");
const {sign} = require('hono/jwt');
const jwt_key =process.env.KEY_JWT;

async function SignupHandler (req,res){
    console.log(`1${jwt_key}1`);
    console.log(typeof jwt_key);

    const deviceIp = DeviceIpGenerator();
    //const tokenkey = await keyGenerator(deviceIp);
    const role = req.requestMetadata.role;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    
    //check for existing user 
    const existingUser = await User.findOne({
        email
    });

    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User Already exists! try different credentials"
        })
    }

    //Create a new Entry in the Database

    const user = await User.create({
        role:req.requestMetadata.role,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        ipAddress:deviceIp,
        mobileNumber:req.body.mobileNumber

    });

    if(!user){
        return res.status(400).json({
            success:false,
            messsage:"User creation failed."
        })
    }

    const userId = user._id;

    // Signup token
    const signToken = await sign({userId,firstName,role,email,password,deviceIp},jwt_key);
    console.log(signToken);
    
    return res.status(200).json({
        success:true,
        message:"Complex User Created successfully",
        userInformation:{user},
        token:signToken
    })
}

module.exports = SignupHandler;