// This function will authenticate the incoming requests of the key and Qr codes.
// Imports needed
// JWT key for the key

const jwt = require("jsonwebtoken");

async function AuthEngine( key,key_jwt,wifiIp, currentWifiIp ){
  if(wifiIp === currentWifiIp){ console.log("wifi matched") }else{
    return res.status(400).json({
      "success":false,
      "message":"Please connect to the wifi professor selected to proceed"
    })
  }

  const result = jwt.safeParse({key},key_jwt);
  if(!result){
    return res.status(400).json({
      " success":false,
      "message":"Auth failed in the token parsing stage"
    })
  }
  
}