const DaoMongoDbMessages = require("./DaoMongoDbMessages");
const DaoMemoryMessages = require("./DaoMemoryMessages");

let instance = null;

class MessagesDaoFactory{

  static getInstance() {
    if(!instance) instance = new MessagesDaoFactory()
    return instance
  }

  create(type) {
    switch(type){
      case "mongoDb": return DaoMongoDbMessages.getInstance();
      case "memory" : return DaoMemoryMessages.getInstance();
    }
  }
}

module.exports = MessagesDaoFactory