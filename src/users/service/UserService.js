const bcrypt = require("bcrypt");
const UsersDaoFactory = require("../daos/DaoFactoryUsers");
const logger = require("../../logs/logger");
const { sendEmailNewUser } = require("../../nodemailer/helpers/helpers")

const CartService = require("../../carts/service/CartService");
const cartService = new CartService(process.env.DATA_BASE_CARTS);

const daoFactory = UsersDaoFactory.getInstance()

class UserService {
  constructor(type){
    this.users = daoFactory.create(type)
  }

  async addNewUser (user) {
    try{
      const hashedPasword = await bcrypt.hash(user.password,10)
      user.password = hashedPasword
      const idCart = await cartService.createCart(user.email, user.address)
      user.currentCartId = idCart 
      sendEmailNewUser(process.env.GMAIL_ADMIN, process.env.GMAIL_RECIEVER, user )
      return await this.users.addUser(user)
    } catch(err) {
      logger.error(`Error: ${err}`)
    }
  }
  
  async findUser (email) {
    try {
      return await this.users.findUser(email)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async updateCurrentCartId(email, idCart){
    try {
      const response = await this.users.modifyUser(email, {currentCartId: idCart})
      console.log(response);
      if (!response.matched) return `there is no user with the email ${email}`
      if (!response.modified) return `idCart:${idCart} was the same as the current one`
      return "Id Cart modifiend succesfully"
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async getAllUsers() {
    try{
      return this.users.getAllUsers()
    } catch(err){
      console.log(err);
      logger.error(`Error: ${err}`)
    }
  }
}

module.exports = UserService