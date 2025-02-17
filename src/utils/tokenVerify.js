const jwt = require('jsonwebtoken');
const verify = require("jsonwebtoken");
async function tokenVerify( tokenWithoutBearer, key_jwt ){


    const result = await jwt.verify(
        tokenWithoutBearer,
        key_jwt
    )
    return result;
}

module.exports = tokenVerify;