const ProductService = require("../service/ProductService");
const service = new ProductService(process.env.DATA_BASE_PRODUCTS)

const getAllProducts = async () => {
  return await service.getAllProducts()
}

const findProduct = async({id}) => {
  return await service.findProduct(id)
}

const getProductsByCategory = async (category) => {
  return await service.getProductsByCategory(category.category)
}

const addProduct = async ({args}) => {
  const { title, price, thumbnail, description, category } = args
  const product = {
    title,
    price,
    thumbnail,
    description,
    category
  }
  return await service.addProduct(product)
}

const modifyProductById = async ({args}) => {
  const { title, price, thumbnail, description, category, id } = args
  const productUpdate = {
    title,
    price,
    thumbnail,
    description,
    category,
    id
  }
  return await service.modifyProductById(id,productUpdate)
}

const deleteProduct = async ( {id} ) => {
  return await service.deleteProduct(id)
}

const deleteAllProducts = async () => {
  return await service.deleteAllProducts()
}

module.exports = {
  getAllProducts,
  findProduct,
  getProductsByCategory,
  addProduct,
  modifyProductById,
  deleteProduct,
  deleteAllProducts
}