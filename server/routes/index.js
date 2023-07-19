const router = require("express").Router()
const ProductController = require("../controllers/productController")
const UserController = require("../controllers/userController")
const authentication = require("../middleware/authentication")
const errorHandler = require("../middleware/errorHandler")

router
   .post("/user/register", UserController.register)
   .post("/user/login", UserController.login)
   .post("/product/add", authentication, ProductController.createProduct)
   .get("/product", authentication, ProductController.listProduct)
   .get("/product/:id", authentication, ProductController.findProduct)
   .put("/product/:id", authentication, ProductController.editProduct)
   .delete("/product/:id", authentication, ProductController.deleteProduct)
   .use(errorHandler)

module.exports = router