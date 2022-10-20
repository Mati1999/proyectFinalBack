const MemoryContainer = require("../../persistence/MemoryContainer");
const logger = require("../../logs/logger");

let instance = null;

class DaoMemoryOrders {
  constructor() {
    this.memoryClient = new MemoryContainer();
  }

  static getInstance () {
    if (!instance) instance = new DaoMemoryOrders();
    return instance
  }

  createNewOrder( order ) {
    try {
      return this.memoryClient.save( order ) 
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  getOrderById ( id ) {
    try {
      return this.memoryClient.getBy("id", id )
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  deleteOrderById( id ) {
    try {
      return this.memoryClient.deleteById(id)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }
}

module.exports = DaoMemoryOrders