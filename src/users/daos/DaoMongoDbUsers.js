const mongoose = require("mongoose");
const MongoDbContainer = require("../../persistence/MongoDbContainer");
const logger = require("../../logs/logger");

const userSchema = new mongoose.Schema({
  email:{type: String, require:true, unique:true},
  name:{type: String, require:true},
  surname: {type:String, require:true},
  tel: {type:Number, require:true},
  password: {type:String, require:true},
  admin: {type:Boolean},
  currentCartId: {type:Number},
  address: {type:String}
})

let instance = null;

class DaoMongoDbUsers {
  constructor() {
    this.mongoClient = new MongoDbContainer("users",userSchema)
  }

  static getInstance(){
    if (!instance) instance = new DaoMongoDbUsers()
    return instance
  }

  async getAllUsers(){
    try{
      return await this.mongoClient.getAll()
    } catch(err) {
      logger.error(`Error: ${err}`)
    }
  }

  async addUser(user) {
    try{
      await this.mongoClient.save(user)
      return user
    } catch (err){
      logger.error(`Error: ${err}`)
    }
  } 

  async findUser (email) {
    try{
      let user = await this.mongoClient.getById({email:email})
      return user.toJSON()
    } catch (err){
      logger.error(`Error: ${err}`)
    }
  }

  async modifyUser(email, update) {
    try {
      return await this.mongoClient.modifyBy("email",email, update)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }
}

module.exports = DaoMongoDbUsers
