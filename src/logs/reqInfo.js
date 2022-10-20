const logger = require("./logger");

const reqInfo = ( req, res, next )=> {
  logger.info(`Ruta: ${req.originalUrl} Método: ${req.method}`)
  next ()
}

module.exports = reqInfo;