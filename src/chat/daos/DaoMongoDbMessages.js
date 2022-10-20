const mongoose = require("mongoose");
const MongoDbContainer = require("../../persistence/MongoDbContainer");
const logger = require("../../logs/logger");

const messageSchema = new mongoose.Schema({
  email:{type:String, require: true},
  type:{type:String, require: true},
  date:{type:String, require: true},
  message:{type:String, require: true}
})

let instance = null;

class DaoMongoDbMessages {
  constructor() {
    this.mongoClient = new MongoDbContainer("messages", messageSchema)
  }

  static getInstance(){
    if (!instance) instance = new DaoMongoDbMessages()
    return instance
  }

  async addMessage(message) {
    try {
      await this.mongoClient.save(message)
      return message
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async getAllMessages() {
    try {
      return await this.mongoClient.getAll()
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async getMessagesByEmail(email) {
    try {
      return await this.mongoClient.getByProperty({email:email})
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }
  
}

module.exports = DaoMongoDbMessages