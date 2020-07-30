require("dotenv").config();
const jwt = require("jsonwebtoken");

//chave para criptografia
const tokenPrivatekey = process.env.JWT_TOKEN_PRIVATE_KEY;
const refreshTokenPrivatekey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;

const options = { expiresIn: "30 minutes" };
const refreshOptions = { expiresIn: "30 days" };

// função para verificar o JWT e o refreshJwt
const generateJwt = (payload) => {
    return jwt.sign(payload, tokenPrivatekey, options);
};

const generateRefreshJwt = (payload) => {
    return jwt.sign(payload, refreshTokenPrivatekey, refreshOptions);
};

// função para validar o JWT e o refreshJwt

const verifyJwt = (token) => {
    return jwt.verify(token, tokenPrivatekey);
};

const verifyRefreshJwt = (token) => {
    return jwt.verify(token, refreshTokenPrivatekey);
};

module.exports = { generateJwt, generateRefreshJwt, verifyJwt, verifyRefreshJwt };