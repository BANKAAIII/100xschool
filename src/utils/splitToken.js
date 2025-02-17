function splitToken(token) {
    if (!token) return ""; // Prevents issues with undefined token
    return token.startsWith('Bearer ') ? token.slice(7) : token;
}

module.exports = splitToken;
