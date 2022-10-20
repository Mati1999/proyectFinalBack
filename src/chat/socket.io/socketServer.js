const MessagesService = require("../service/MessagesService");
const service = new MessagesService (process.env.DATA_BASE_MESSAGES)

const socketServer = async ( io, socket ) => {
  
  socket.emit("messages", await service.getAllMessages())

  socket.on("new_message", async ( message ) => {
    console.log("new_message Socket");
    await service.addMessage(message)
    io.sockets.emit("messages", await service.getAllMessages())
  })
}

module.exports = socketServer