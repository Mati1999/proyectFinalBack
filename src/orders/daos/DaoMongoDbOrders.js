const mongoose = require("mongoose");
const MongoDbContainer = require("../../persistence/MongoDbContainer");
const logger = require("../../logs/logger");

const ordersSchema = new mongoose.Schema({
  id:{type:Number, require:true, unique:true},
  products:{type:Array, require:true},
  date:{type:String, require:true},
  status:{type:String, require:true},
  email:{type:String, require:true},
  shippingAddress: {type:String, require: true },
  total:{type:Number, require:true}
})

let instance = null;

class DaoMongoDbOrders {

  constructor() {
    this.idCounter = 1;
    this.mongoClient = new MongoDbContainer("orders", ordersSchema)
  }

  static getInstance(){
    if(!instance) instance = new DaoMongoDbOrders();
    return instance
  }

  async createNewOrder(order) {
    try {
      const allOrders = await this.mongoClient.getAll()
      if (allOrders.length !== 0){
        allOrders.forEach(order => {
          if(this.idCounter <= order.id ) this.idCounter = order.id + 1
        })
      }
      order.id = this.idCounter
      return await this.mongoClient.save(order)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async getOrderById(id){
    try {
      return await this.mongoClient.getById({id:id})
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async deleteOrderById(id) {
    try {
      return await this.mongoClient.deleteById({id:id})
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }
}

module.exports = DaoMongoDbOrders