const logger = require("../logs/logger");

class MemoryContainer {
  
  constructor(){
    this.idCounter = 0;
    this.array = []
  }

  getAll() {
    try {
      return this.array
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  getBy (searchParam,id) {
    try {
      return this.array.find( item => item[searchParam] === id)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  save( item ) {
    try {
      item.id = this.idCounter + 1;
      this.idCounter ++;
      this.array.push(item)
      return item
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  getByProperty(propertyName, propertyValue ){
    try {
      return this.array.filter( item => item[propertyName] === propertyValue)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  modifyBy(searchParam, id, update) {
    try {
      let response = {modified: true, matched:true}
      const index = this.array.findIndex( item => item[searchParam] === id)
      if(index === -1) response.matched = false
      this.array[index] = {...update, id:id}
      return response
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  deleteById( id ) {
    try {
      let response = {deleted:true}
      if (!this.getBy("id",id)) response.deleted = false
      this.array = this.array.filter( item => item.id !== id)
      return response
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  deleteAll () {
    try {
      this.array = []
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }
}

module.exports = MemoryContainer