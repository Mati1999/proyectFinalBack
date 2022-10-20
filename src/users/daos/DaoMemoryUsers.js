const MemoryContainer = require("../../persistence/MemoryContainer");
const logger = require("../../logs/logger");

let instance = null;

class DaoMemoryUsers {
  constructor() {
    this.memoryClient = new MemoryContainer();
  }

  static getInstance () {
    if (!instance) instance = new DaoMemoryUsers();
    return instance
  }

  getAllUsers(){
    try{
      return this.memoryClient.getAll()
    } catch(err) {
      logger.error(`Error: ${err}`)
    }
  }

  addUser(user) {
    try{
      this.memoryClient.save(user)
      return user
    } catch (err){
      logger.error(`Error: ${err}`)
    }
  } 

  findUser (email) {
    try{
      return this.memoryClient.getBy("email",email)
    } catch (err){
      logger.error(`Error: ${err}`)
    }
  }

  modifyUser(email, update) {
    try {
      return this.memoryClient.modifyBy("email",email, update)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }
}

module.exports = DaoMemoryUsers