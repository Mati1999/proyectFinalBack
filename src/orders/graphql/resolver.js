const OrderService = require("../service/OrderService");
const service = new OrderService(process.env.DATA_BASE_ORDERS)

const createNewOrder = async (args) => {
  const { email, products, shippingAddress, total, user } = args
  const order = { email, products, shippingAddress, total }
  return await service.createNewOrder(order, user)
}

const getOrderById = async ( {id} ) => {
  return await service.getOrderById(id)
}

const deleteOrderById = async ( {id} ) => {
  return await service.deleteOrderById(id)
}

module.exports = {
  createNewOrder,
  getOrderById,
  deleteOrderById
}