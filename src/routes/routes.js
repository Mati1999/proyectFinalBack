const logger = require("../logs/logger")

const error = (req, res) => {
  logger.warn(`Route: ${req.originalUrl} Method: ${req.method} No Implemented`)
  res.render("error.ejs", {error: {originalUrl: req.originalUrl, method: req.method }})
}

const getOptions = ( req, res ) => {
  options = {
    port: process.env.PORT || 8080,
    tokenExpiringTime: process.env.TOKEN_EXPIRING_TIME,
    dataBaseUsers: process.env.DATA_BASE_USERS,
    dataBaseProducts: process.env.DATA_BASE_PRODUCTS,
    dataBaseCarts: process.env.DATA_BASE_CARTS,
    dataBaseOrders: process.env.DATA_BASE_ORDERS,
    dataBaseMessages: process.env.DATA_BASE_MESSAGES,
    emailReciever: process.env.GMAIL_RECIEVER,
    emailAdmin: process.env.GMAIL_ADMIN,
    enviroment: process.env.NODE_ENV || "development"
  }
  res.render("options.ejs", {options})
}

module.exports = {
  error,
  getOptions
}