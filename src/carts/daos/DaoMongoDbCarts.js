const mongoose = require("mongoose");
const MongoDbContainer = require("../../persistence/MongoDbContainer");
const logger = require("../../logs/logger");

const cartSchema = new mongoose.Schema({
  id:{type:Number, require:true, unique:true},
  email:{type:String, require:true},
  date:{type:String, require:true},
  products:{type:Array, require:true},
  shippingAddress:{type:String, require:true},
  total:{type:Number, require: true}
})

let instance = null;

class DaoMongoDbCarts {
  constructor(){
    this.idCounter = 1
    this.mongoClient = new MongoDbContainer("carts", cartSchema)
  }

  static getInstance(){
    if (!instance) instance = new DaoMongoDbCarts()
    return instance
  }

  async getCartById(id){
    try {
      return await this.mongoClient.getById({id:id})
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async createCart(cart){
    try {
      const allCarts = await this.mongoClient.getAll();
      if (allCarts.length !== 0){
        allCarts.forEach(item => {
          if (this.idCounter <= item.id ) this.idCounter = item.id + 1;
        });
      }
      cart.id = this.idCounter
      return await this.mongoClient.save(cart)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async modifyCart( id, cartUpdate ){
    try {
      return await this.mongoClient.modifyBy("id", id, cartUpdate)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async deleteCart(id){
    try {
      return await this.mongoClient.deleteById({id:id})
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

}

module.exports = DaoMongoDbCarts