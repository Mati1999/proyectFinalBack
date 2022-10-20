const CartService = require("../service/CartService");
const service = new CartService(process.env.DATA_BASE_CARTS);

const getCart = async({id}) => {
  return await service.getCart(id)
}
const createCart = async({email, shippingAddress}) => {
  return await service.createCart(email, shippingAddress)
}
const addProductToCart = async({ idCart, idProduct, quantity }) => {
  return await service.addProductToCart(idCart, idProduct, quantity)
}
const deleteProductFromCart = async({idCart, idProduct}) => {
  return await service.deleteProductFromCart(idCart, idProduct)
}
const deleteCart = async({id}) => {
  return await service.deleteCart(id)
}

module.exports = {
  getCart,
  createCart,
  addProductToCart,
  deleteProductFromCart,
  deleteCart
}

