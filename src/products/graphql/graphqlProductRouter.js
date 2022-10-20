const fs = require("fs");
const {buildSchema} = require("graphql")
const {graphqlHTTP} = require("express-graphql")
const {getAllProducts, findProduct, getProductsByCategory, addProduct, modifyProductById, deleteProduct, deleteAllProducts} = require("./resolver")
const {Router} = require("express");

const schemaString = fs.readFileSync("./src/products/graphql/product.gql").toString();
const compiledSchema = buildSchema(schemaString)
const {authenticateToken} = require("../../middlewares/auth")

const graphMiddleware = graphqlHTTP({
  schema: compiledSchema,
  rootValue:{
    getAllProducts,
    findProduct,
    getProductsByCategory,
    addProduct,
    modifyProductById,
    deleteProduct,
    deleteAllProducts
  },
  graphiql:true
})

const graphqlProductRouter = Router();
graphqlProductRouter.use("/graphql/products", authenticateToken , graphMiddleware)

module.exports = graphqlProductRouter