const DaoMongoDbCarts = require("./DaoMongoDbCarts");
const DaoMemoryCarts = require("./DaoMemoryCarts");

let instance = null;

class CartDaoFactory {

  static getInstance(){
    if(!instance) instance = new CartDaoFactory()
    return instance
  }

  create(type){
    switch(type){
      case "mongoDb": return DaoMongoDbCarts.getInstance();
      case "memory" : return DaoMemoryCarts.getInstance();
    }
  }
  
}

module.exports = CartDaoFactory