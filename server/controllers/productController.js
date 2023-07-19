const { Product } = require("../models")

class ProductController {
   static async createProduct(req, res, next) {
      try {
         const { image, name, buyPrice, sellPrice, stock } = req.body
         await Product.create({ image, name, buyPrice, sellPrice, stock })
         res.status(201).json({ message: "Product created" })
      } catch (error) {
         next(error)
      }
   }

   static async findProduct(req, res, next) {
      try {
         const { id } = req.params
         const product = await Product.findByPk(id)
         res.status(201).json(product)
      } catch (error) {
         next(error)
      }
   }

   static async editProduct(req, res, next) {
      try {
         const { id } = req.params
         const { image, name, buyPrice, sellPrice, stock } = req.body
         await Product.update({ image, name, buyPrice, sellPrice, stock }, { where: { id } })
         res.status(201).json({ message: "Product successfully updated" })
      } catch (error) {
         next(error)
      }
   }

   static async deleteProduct(req, res, next) {
      try {
         const { id } = req.params
         const deletedProduct = await Product.destroy({ where: { id } })
         if (deletedProduct === 0) throw { name: "NotFound" }
         res.status(201).json({ message: "Product successfully deleted" })
      } catch (error) {
         next(error)
      }
   }
}

module.exports = ProductController