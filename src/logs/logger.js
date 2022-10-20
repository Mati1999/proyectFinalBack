const log4js = require("log4js");

log4js.configure({
  appenders:{
    console: {type: "console"},
    warnFile: { type: "file", filename: "./src/logs/warn.log"},
    errorFile: { type: "file", filename: "./src/logs/error.log"},
    soloWarn: {type: "logLevelFilter", appender: "warnFile", level: "warn"},
    soloError: {type: "logLevelFilter", appender: "errorFile", level: "error"},
  },
  categories:{ 
    default: {appenders: ["console"], level: "info"},
    development: { appenders: ["console", "soloWarn", "soloError"], level: "info" },
    production: { appenders: ["soloWarn", "soloError"], level: "warn"}
  }
})

const logToUse = process.env.NODE_ENV === "PROD" ? "production" : "development";

module.exports = log4js.getLogger(logToUse);