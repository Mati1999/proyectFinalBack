const MessagesService = require ("../service/MessagesService");
const service = new MessagesService(process.env.DATA_BASE_MESSAGES)

const addMessage = async ({args}) => {
  const { email, type, date, message } = args
  const messageToAdd = { email, type, date, message }
  return await service.addMessage(messageToAdd)
}

const getAllMessages = async () => {
  return await service.getAllMessages()
}

const getMessagesByEmail = async ({email}) => {
  return await service.getMessagesByEmail(email)
}

module.exports = {
  addMessage,
  getAllMessages,
  getMessagesByEmail
}