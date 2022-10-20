const DaoMongoDbOrders = require("./DaoMongoDbOrders");
const DaoMemoryOrders = require("./DaoMemoryOrders");

let instance = null; 

class OrderDaoFactory{

  static getInstance() {
    if(!instance) instance = new OrderDaoFactory()
    return instance
  }

  create(type){
    switch(type){
      case "mongoDb": return DaoMongoDbOrders.getInstance();
      case "memory" : return DaoMemoryOrders.getInstance();
    }
  }
}

module.exports = OrderDaoFactory