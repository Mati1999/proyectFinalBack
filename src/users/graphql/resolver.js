const UserService = require ("../service/UserService");
const service = new UserService(process.env.DATA_BASE_USERS);

const addNewUser = async ({args}) => {
  const { email, name, surname, tel, password, currentCartId, address, admin} = args
  const user = { email, name, surname, tel, password, currentCartId, address, admin}
  return await service.addNewUser(user)
}

const findUser = async ({email}) => {
  return await service.findUser(email)
}

const updateCurrentCartId = async ({email, idCart}) => {
  return await service.updateCurrentCartId(email, idCart)
}

const getAllUsers = async () => {
  return await service.getAllUsers()
}

module.exports = {
  addNewUser,
  findUser,
  updateCurrentCartId,
  getAllUsers
}