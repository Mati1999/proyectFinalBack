const express = require("express");
const productRouter = express.Router()

productRouter.use(express.json());

const ProductService = require("../service/ProductService")
const service = new ProductService(process.env.DATA_BASE_PRODUCTS)

const {authenticateToken, isAdmin} = require("../../middlewares/auth")

productRouter.get("/:category?", authenticateToken, async ( req, res ) => {
  let products = null
  const caterogy = req.params.category
  if(caterogy){
    if(isNaN(parseInt(caterogy))){
      products = await service.getProductsByCategory(caterogy)
    } else {
      const id = parseInt(caterogy)
      products = [await service.findProduct(id)]
      if (!products[0]) res.status(404).send({error: `product with id: ${id} Not found`})  
    }
  } else {
    products = await service.getAllProducts()
  }
  res.render("products.ejs", {name: req.user.name, products:products, admin:req.user.admin} )
})

productRouter.post("/", authenticateToken, isAdmin, async ( req, res ) => {
  const { title, price, description, category, thumbnail } = req.body
  const product = { title, price, description, category, thumbnail }
  await service.addProduct(product)
  res.send(product)
})

productRouter.put("/:id", authenticateToken, async ( req, res ) => {
  const id = parseInt(req.params.id)
  const { title, price, description, category, thumbnail } = req.body
  const update = { title, price, description, category, thumbnail }
  if(isNaN(id)) res.status(400).send({error: "id Must be a number"})
  const response = await service.modifyProductById(id,update)
  res.send(response)
})

productRouter.delete("/:id", authenticateToken, isAdmin, async ( req, res ) => {
  const id = parseInt(req.params.id)
  if(isNaN(id)) res.status(400).send({error: "id Must be a number"})
  await service.deleteProduct(id);
  res.send("Successfully deleted")
})

module.exports = productRouter