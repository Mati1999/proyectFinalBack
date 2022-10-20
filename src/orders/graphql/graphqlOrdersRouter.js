const fs = require("fs");
const {buildSchema} = require("graphql")
const {graphqlHTTP} = require("express-graphql")
const {Router} = require("express");
const { createNewOrder, getOrderById, deleteOrderById} = require("./resolver");

const schemaString = fs.readFileSync("./src/orders/graphql/orders.gql").toString();
const compiledSchema = buildSchema(schemaString)
const {authenticateToken} = require("../../middlewares/auth")

const graphMiddleware = graphqlHTTP({
  schema:compiledSchema,
  rootValue:{
    createNewOrder,
    getOrderById,
    deleteOrderById
  },
  graphiql:true
})

const graphqlOrdersRouter = Router();
graphqlOrdersRouter.use("/graphql/orders", authenticateToken, graphMiddleware);

module.exports = graphqlOrdersRouter