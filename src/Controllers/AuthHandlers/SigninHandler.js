const { User } = require('../../../db');
const DeviceIpGenerator = require('../AttendanceHandlers/DeviceIpGenerator');
const { Jwt } = require('hono/utils/jwt');
const key_jwt = process.env.KEY_JWT;

async function SigninHandler(req, res) {
    const { firstName, mobileNumber, email, password } = req.body;
    const role = req.requestMetadata.role;
    const ipAddress = DeviceIpGenerator();

    let primaryCred = email ? "email" : "mobileNumber";
    let inputValue = email || mobileNumber;

    console.log("PrimaryCred:", primaryCred);
    console.log("inputValue:", inputValue);
    console.log("userInfo:", { email, role, ipAddress, password, mobileNumber });

    const existingUser = await User.findOne({
        [primaryCred]: inputValue,
        role: role
    });

    if (!existingUser) {
        return res.status(400).json({
            success: false,
            message: "No existing user found!!",
        });
    }

    const token = await Jwt.sign({
        id: existingUser._id,
        role,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        inputValue,
        ipAddress
    }, key_jwt);

    return res.status(200).json({
        success: true,
        message: "User signed in successfully!!",
        token
    });
}

module.exports = SigninHandler;
