const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserController {
   static async register(req, res, next) {
      try {
         const { email, password } = req.body;
         const user = await User.create({ email, password });
         res.status(201).json({ id: user.id, email: user.email });
      } catch (error) {
         next(error);
      }
   }

   static async login(req, res, next) {
      try {
         const { email, password } = req.body;
         if (!email || !password) throw { name: "EmailPasswordRequired" };
         const user = await User.findOne({
            where: {
               email,
            },
         });
         if (!user) throw { name: "EmailPasswordInvalid" };
         const checkPassword = comparePassword(password, user.password);
         if (!checkPassword) throw { name: "EmailPasswordInvalid" };
         const payload = { id: user.id };
         const access_token = signToken(payload);
         res.status(200).json({ access_token });
      } catch (error) {
         next(error);
      }
   }
}

module.exports = UserController