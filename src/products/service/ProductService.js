const ProductDaoFactory = require("../daos/DaoFactoryProduct");
const logger = require("../../logs/logger");

const daoFactory = ProductDaoFactory.getInstance()

class ProductService{
  constructor(type){
    this.products = daoFactory.create(type)
  }

  async getAllProducts () {
    try {
      return await this.products.getAllProducts()
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async findProduct (id) {
    try {
      const idNumber = parseInt(id)
      if(isNaN(idNumber)) return {error: "Id must be a number"}
      return await this.products.findProduct(id)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async getProductsByCategory(category){
    try {
      return await this.products.filterByCategory(category)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async addProduct (product) {
    try {
      return await this.products.addProduct(product)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async modifyProductById(id, productUpdate){
    try {
      const response = await this.products.modifyProductById(id,productUpdate)
      if (!response.matched) return {error: `there is no product with the id ${id}`}
      if (!response.modified) return {error: `product update was the same as the current product`}
      productUpdate.id = id
      return productUpdate
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async deleteProduct (id) {
    try {
      const response = await this.products.deleteProduct(id)
      if (response.deleted) {
        return "Product Deleted Succesfully"
      } else {
        return `there were no products with the id: ${id}`
      }
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async deleteAllProducts () {
    try {
      await this.products.deleteAllProducts()
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }
}

module.exports = ProductService