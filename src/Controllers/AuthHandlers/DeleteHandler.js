const  jwt  = require('hono/jwt');
const { User} = require('../../../db');
const DeviceIpGenerator = require('../AttendanceHandlers/DeviceIpGenerator');
const jwt_key = process.env.KEY_JWT;

async function DeleteHandler ( req,res ){
    const token = req.headers['authorization'];
    const tokenWithoutBearer = token.startsWith('Bearer ')? token.slice(7,token.length):token;

    const decoded =await  jwt.verify( tokenWithoutBearer,jwt_key );

    const { role:role,email:email, ipAddress:ipAddress,password:password } = decoded;

    const existingUser = await User.findOne({
        role,email,password,ipAddress
    });

    if(!existingUser){
        return res.status(400).json({
            success:false,
            msg:"deletion failed"
        })
    }

    const deleted = await User.findOneAndDelete({
        role,email,password,ipAddress
    })

    if(!deleted){
        return res.status(400).json({
            success:false,
            msg:"user deletion failed again"
        })
    }

    return res.status(200).json({
        success:true,
        msg:"deletion successfull"
    })
}

module.exports = DeleteHandler;