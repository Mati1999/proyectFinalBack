const mongoose = require ("mongoose");
const logger = require("../logs/logger");

class MongoDbContainer {

  constructor(collection, prodSchema) {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this.collection = mongoose.model(collection, prodSchema);
  }

  async getAll(){
    try{
      return await this.collection.find()
    } catch(err){
      logger.error(`Error: ${err}`)
    }
  }

  async save(item){
    try { 
      const itemToAdd = new this.collection(item)
      await itemToAdd.save()
      return(item)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async getById(id) {
    try {
      return (await this.collection.find(id))[0]
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async getByProperty(property) {
    try {
      return (await this.collection.find(property))
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async modifyBy(param,id,update) {
    try{
      const response = await this.collection.updateOne({[param]:id},{$set:{...update}})
      const modified = response.modifiedCount !== 0;
      const matched = response.matchedCount !== 0;
      return ({modified, matched})
    } catch(err){
      logger.error(`Error: ${err}`)
    }
  }

  async deleteById(id){
    try{
      const response = await this.collection.deleteOne(id)
      const deleted = response.deletedCount !== 0
      return ({deleted})
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async deleteAll(){
    try {
      const response = await this.collection.deleteMany()
      const deleted = response.deletedCount !== 0
      return ({deleted})
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }
}


module.exports = MongoDbContainer;