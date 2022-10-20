const express = require("express");
const cartRouter = express.Router()

cartRouter.use(express.json())

const CartService = require("../service/CartService");
const service = new CartService(process.env.DATA_BASE_CARTS)

const { authenticateToken,isAdmin } = require("../../middlewares/auth");

cartRouter.get("/",authenticateToken,async (req,res) => {
  const id = req.user.currentCartId
  const cart = await service.getCart(id)
  res.render("cart.ejs",{ cart })
})

cartRouter.post("/",authenticateToken,async (req,res) => {
  const email = req.user.email;
  const shippingAddress = req.user.shippingAddress;
  const cartId = await service.createCart(email,shippingAddress)
  res.send(cartId)
})

cartRouter.post("/:id",authenticateToken,async (req,res) => {
  const idCart = req.user.currentCartId
  const idProduct = parseInt(req.params.id)
  const quantity = parseInt(req.body.quantity)
  const response = await service.addProductToCart(idCart,idProduct,quantity)
  if (response) {
    res.status(400).send(response)
  } else {
    res.send("Product added to cart successfully ")
  }
})

cartRouter.delete("/:id",authenticateToken,async (req,res) => {
  const idProd = req.params.id;
  const idCart = req.user.currentCartId;
  await service.deleteProductFromCart(idCart,idProd)
  res.send("Product removed from cart")
})

cartRouter.delete("/",authenticateToken,isAdmin,async (req,res) => {
  const id = req.user.currentCartId
  await service.deleteCart(id)
  res.send("cart deleted successfully")
})


module.exports = cartRouter