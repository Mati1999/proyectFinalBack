const DaoMongoDbUsers = require("./DaoMongoDbUsers");
const DaoMemoryUsers = require("./DaoMemoryUsers");

let instance = null;

class UsersDaoFactory{
  
  static getInstance() {
    if(!instance) instance = new UsersDaoFactory()
    return instance
  }

  create(type) {
    switch(type){
      case "mongoDb": return DaoMongoDbUsers.getInstance();
      case "memory" : return DaoMemoryUsers.getInstance();
    }
  }
}

module.exports = UsersDaoFactory