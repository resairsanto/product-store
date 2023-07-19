const router = require("express").Router()
const UserController = require("../controllers/userController")
const errorHandler = require("../middleware/errorHandler")

router
   .post("/user/register", UserController.register)
   .post("/user/login", UserController.login)
   .use(errorHandler)

module.exports = router