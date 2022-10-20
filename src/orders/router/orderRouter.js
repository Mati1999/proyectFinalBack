const express = require ("express");
const orderRouter = express.Router()

orderRouter.use( express.json() );

const OrderService = require("../service/OrderService");
const service = new OrderService(process.env.DATA_BASE_ORDERS)

const CartService = require("../../carts/service/CartService")
const cartService = new CartService (process.env.DATA_BASE_CARTS)

const {authenticateToken, isAdmin} = require("../../middlewares/auth");

orderRouter.get("/:id", authenticateToken, async ( req, res ) => {
  const orderId = req.params.id
  const order = await service.getOrderById(orderId)
  res.send(order)
})

orderRouter.post("/", authenticateToken, async ( req, res ) => {
  const user = req.user
  const cart = await cartService.getCart(user.currentCartId);
  const order = {
    email: req.user.email,
    products: cart.products,
    shippingAddress: cart.shippingAddress,
    total:cart.total
  }
  const orderGenerated = await service.createNewOrder(order, user)
  res.send({orderId:orderGenerated.id})
})

orderRouter.delete("/:id", authenticateToken, isAdmin, async ( req, res ) => {
  const id = req.params.id
  const response = await service.deleteOrderById(id)
  res.send(response)
})

module.exports = orderRouter