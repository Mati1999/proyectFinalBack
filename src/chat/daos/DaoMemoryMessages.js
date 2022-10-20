const MemoryContainer = require("../../persistence/MemoryContainer");
const logger = require("../../logs/logger");

let instance = null;

class DaoMemoryMessages {
  constructor() {
    this.memoryClient = new MemoryContainer();
  }

  static getInstance () {
    if (!instance) instance = new DaoMemoryMessages();
    return instance
  }

  addMessage( message ) {
    try {
      this.memoryClient.save(message)
      return message
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  getAllMessages () { 
    try {
      return this.memoryClient.getAll()
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  getMessagesByEmail ( email ) {
    try {
      return this.memoryClient.getByProperty("email", email)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }
}

module.exports = DaoMemoryMessages