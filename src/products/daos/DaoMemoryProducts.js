const MemoryContainer = require("../../persistence/MemoryContainer");
const logger = require("../../logs/logger")

let instance = null;

class DaoMemoryProducts {
  constructor () {
    this.memoryClient = new MemoryContainer();
  }

  static getInstance () {
    if (!instance) instance = new DaoMemoryProducts();
    return instance
  }

  getAllProducts() {
    try {
      return this.memoryClient.getAll()
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  addProduct ( product ) {
    try {
      return this.memoryClient.save( product )
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  findProduct ( id ){
    try {
      return this.memoryClient.getBy("id", id )
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  } 

  filterByCategory ( category ) {
    try {
      return this.memoryClient.getByProperty("category", category)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  modifyProductById(id, productUpdate ) {
    try {
      return this.memoryClient.modifyBy("id", id, productUpdate)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  deleteProduct ( id ) {
    try {
      return this.memoryClient.deleteById(id)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  deleteAllProducts() {
    try {
      return this.memoryClient.deleteAll()
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }
}

module.exports = DaoMemoryProducts
