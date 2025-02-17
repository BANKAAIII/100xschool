const {User} = require("../../../db");
const {Class} = require("../../../db");

const key_jwt = process.env.KEY_JWT;
const jwt = require("jsonwebtoken");


async function createClass( req,res ){
    const { studentPassword,profPassword } = req.body;
    const token = req.headers['authorization'];
    const ClassName =req.body.ClassName; 

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "The token is missing in the request"
        });
    }
            // Remove 'Bearer ' prefix if present
            const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
            
            // Verify the token and extract the role
            const decoded = jwt.verify(tokenWithoutBearer, key_jwt);
            console.log("verified");
            const { role,firstName, email,ipAddress } = decoded;
            console.log(firstName);
            console.log(email);
            console.log(role);

       

        

        const creator = await User.findOne({
            role:role,
            email:email,
            ipAddress:ipAddress
        })

            if(creator.role === "student"){
                return res.status(401).json({
                    success:false,
                    msg:"access denied"
                })
            }

            console.log(creator);
        

            if(!creator){
                return res.status(400).json({
                    success:false,
                    msg:"The request failed in the creator finding block"
                })
            }



// unique classroom creation test
const notUnique = await Class.findOne({
    creatorIp:ipAddress,
    name:ClassName,
   
})

    if(notUnique){
        return res.status(400).json({
            success:false,
            msg:"you already created a classroom with the same name"
        })
    }

const newClass = await Class.create({
    name:ClassName,
    creatorIp:ipAddress,
    members:[],
    attendanceSheetId:[],
    studentPassword:studentPassword,
    profPassword:profPassword
})

if(!newClass){
    return res.status(400).json({
        success:false,
        msg:"failed to create a  new classroom"
    })
}

        
        return res.status(200).json({
            success:true,
            msg:"New Classroom created!!"
        })
}

module.exports = createClass;