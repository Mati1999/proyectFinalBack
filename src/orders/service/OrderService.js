const OrderDaoFactory = require("../daos/DaoFactoryOrder");
const logger = require("../../logs/logger");

const daoFactory = OrderDaoFactory.getInstance()

const CartService = require("../../carts/service/CartService");
const cartService = new CartService(process.env.DATA_BASE_CARTS);
const UserService = require("../../users/service/UserService");
const userService = new UserService(process.env.DATA_BASE_USERS);

const {sendEmailNewOrder} = require("../../nodemailer/helpers/helpers")

class OrderService {
  constructor(type) {
    this.orders = daoFactory.create(type)
  }

  async createNewOrder(order, user) {
    try{
      order.date = new Date()
      order.status = "generated"
      const orderGenerated = await this.orders.createNewOrder(order)
      if(orderGenerated) {
        await cartService.deleteCart(user.currentCartId)
        const newIdCart = await cartService.createCart(user.email, user.address)
        await userService.updateCurrentCartId(user.email, newIdCart)
        sendEmailNewOrder(process.env.GMAIL_ADMIN, process.env.GMAIL_RECIEVER, order)
        return orderGenerated.id
      }
      return {error: "error processing the purchase"}
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async getOrderById( id ) {
    try {
      const orderId = parseInt(id);
      if(isNaN(orderId)) return {error: "Id must be a number"}
      return await this.orders.getOrderById(orderId)
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async deleteOrderById(id) {
    try {
      if( isNaN( parseInt(id) )) return {error: "Id must be a number"}
      const response = await this.orders.deleteOrderById(id)
      if (response.deleted) {
        return "Product Deleted Succesfully"
      } else {
        return `there were no products with the id: ${id}`
      }
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }
}

module.exports = OrderService