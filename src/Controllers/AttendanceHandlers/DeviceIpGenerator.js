const os = require('os');

function getLocalIpAddress(req,res,next) {
  const networkInterfaces = os.networkInterfaces();

  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const interfaceInfo of interfaces) {
      if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
        return interfaceInfo.address;
      }
    }
  }
  return null; // In case no IP address is found
}

let ipAddress = getLocalIpAddress();
console.log(ipAddress);

module.exports = getLocalIpAddress;