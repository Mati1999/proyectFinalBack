const DaoMongoDbProduct = require("./DaoMongoDbProduct");
const DaoMemoryProducts = require("./DaoMemoryProducts");

let instance = null;

class ProductDaoFactory{

  static getInstance(){
    if(!instance) instance = new ProductDaoFactory()
    return instance
  }

  create(type){
    switch(type){
      case "mongoDb": return DaoMongoDbProduct.getInstance();
      case "memory": return DaoMemoryProducts.getInstance()
    }
  }
  
}

module.exports = ProductDaoFactory