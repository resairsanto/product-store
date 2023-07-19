const jwt = require("jsonwebtoken");

const signToken = (payload) => {
   const JWT_SECRET = process.env.JWT_SECRET;
   return jwt.sign(payload, JWT_SECRET);
};

const verifyToken = (token) => {
   const JWT_SECRET = process.env.JWT_SECRET;
   return jwt.verify(token, JWT_SECRET);
};

module.exports = { signToken, verifyToken };
