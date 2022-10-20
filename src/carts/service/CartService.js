const CartDaoFactory = require("../daos/DaoFactoryCarts");
const ProductService = require("../../products/service/ProductService")
const products = new ProductService(process.env.DATA_BASE_PRODUCTS)
const logger = require("../../logs/logger");

const daoFactory = CartDaoFactory.getInstance();

class CartService {
  constructor(type){
    this.carts = daoFactory.create(type)
  }

  async getCart (id){
    try {
      return await this.carts.getCartById(parseInt(id))
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }
  
  async createCart (email, shippingAddress){
    try {
      const cart = {
        email:email,
        date: new Date(),
        products:[],
        shippingAddress: shippingAddress,
        total:0
      }
      const cartCreated = await this.carts.createCart(cart)
      return cartCreated.id
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async addProductToCart ( idCart, idProduct, quantity ){
    try {
      let product = (await products.findProduct(idProduct))
      if (!product) return `product with id:${idProduct} not found`
      const productToAdd = {...product.toObject(), quantity:quantity}
      let cart = await this.carts.getCartById(idCart)
      const alreadyInCart = cart.products.find(product => product.id == idProduct)
      if(alreadyInCart) return "The product is already in the cart"
      cart.products.push(productToAdd)
      cart.total = cart.products.reduce((accum, product) => accum += product.price * product.quantity, 0)
      const response = await this.carts.modifyCart(idCart,cart)
      if (!response.matched) return `there is no cart with the id ${idcart}`
      return "Product Added to your cart succesfully"
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async deleteProductFromCart (idCart, idProduct){
    try {
      let cart = await this.carts.getCartById(idCart)
      const productsList = cart.products.filter(product => product.id !== parseInt(idProduct))
      cart.products = productsList
      cart.total = cart.products.reduce((accum, product) => accum += product.price * product.quantity, 0)
      const response = await this.carts.modifyCart(idCart, cart)
      if (!response.matched) return `there is no cart with the id ${idCart}`
      if (!response.modified) return `There was no product with id:${idProduct} in the cart`
      return "Product Deleted Succesfully"
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

  async deleteCart (id){
    try {
      const response = await this.carts.deleteCart(id)
      if (!response.deleted) return `there were no carts with id: ${id}`
      return `Cart with id: ${id} deleted successfully`
    } catch (err) {
      logger.error(`Error: ${err}`)
    }
  }

}

module.exports = CartService