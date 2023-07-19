const bcryptjs = require("bcryptjs");

const hashPassword = function (password) {
   return bcryptjs.hashSync(password, 10);
};

const comparePassword = function (password, hash) {
   return bcryptjs.compareSync(password, hash);
};

module.exports = { hashPassword, comparePassword };
