const  jwt  = require('jsonwebtoken');
const DeviceIpGenerator = require('../Attendance/DeviceIpGenerator');

// Dry run 
const  ipAddress = DeviceIpGenerator();
const jwtKey = "ameya";

async function authHandler(ipAddress){
    let ipString = ipAddress
    const random = Math.random();
    console.log("ip Address:", ipAddress );
    console.log("random number generated: ",random);

    // this is the basic unique key for device
    ipString = ipString+random;
    console.log("unique string:",ipString);

    const keyToken = jwt.sign({ipString},jwtKey);
    console.log("token Key: ",keyToken);

}

authHandler(ipAddress);

module.exports = authHandler;
