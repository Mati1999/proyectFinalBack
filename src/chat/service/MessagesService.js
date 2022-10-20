const MessagesDaoFactory = require ("../daos/DaoFactoryMessages");
const logger = require("../../logs/logger");

const daoFactory = MessagesDaoFactory.getInstance()

class MessagesService {
  constructor(type) {
    this.messages = daoFactory.create(type)
  }

  async addMessage (message) {
    try {
      message.date = new Date()
      return await this.messages.addMessage(message)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async getAllMessages() {
    try {
      return await this.messages.getAllMessages()
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async getMessagesByEmail(email) {
    try {
      return await this.messages.getMessagesByEmail(email)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }
}

module.exports = MessagesService