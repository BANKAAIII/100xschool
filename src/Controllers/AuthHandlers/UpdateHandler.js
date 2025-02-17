const { User } =require('../../../db');
const jwt = require( 'hono/jwt');
const key_jwt = process.env.KEY_JWT;
// The device ip is obtained and cross checked against the ip that the user has registered.
// Requirements: role,loginToken, ipAddress
const DeviceIpGenerator = require('../AttendanceHandlers/DeviceIpGenerator');


async function UpdateHandler( req,res ){
    console.log("update handler entered");
    console.log(key_jwt);
    const ipAddress = DeviceIpGenerator();
    const loginToken = req.headers['authorization'];
   const tokenWithoutBearer = loginToken.startsWith('Bearer ')? loginToken.slice(7,loginToken.length): loginToken;


    // Here Login Token verifiying logic
    const decoded = await jwt.verify(tokenWithoutBearer,key_jwt);
    console.log(decoded);

    if(!decoded){
        return res.status(400).json({
           
            message:"Signin/Signup again"
        })
    }

    const email = decoded.email;
    const role = decoded.role;
    console.log("email",email);
    console.log("ipAddress",ipAddress);
    console.log("role",role);

    const existingUser = await User.findOne({
        ipAddress,role,email
    })

    if(!existingUser){
        return res.status(400).json({
            success : false,
            message:"User update failed!!"
        })
    }

    const updateBody = req.body;
        try{
           
            await User.updateOne(
                {ipAddress:ipAddress},
                {$set:updateBody}
            )
        }catch(err){
                return res.status(500).json({
                    success:false,
                    error:err.message,
                    message:"request Failed in tryCatch block"
                })
        }


    return res.status(200).json({
        success:true,
        message:"User Updated successfully",
        credentialsChanged:{updateBody}
    })
}

module.exports = UpdateHandler;