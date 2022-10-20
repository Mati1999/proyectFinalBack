const express = require("express");
const chatRouter = express.Router();

const MessagesService = require ("../service/MessagesService")
const service = new MessagesService(process.env.DATA_BASE_MESSAGES)

chatRouter.use(express.json())

const {authenticateToken} = require("../../middlewares/auth")

chatRouter.get("/", authenticateToken, ( req, res ) => {
  res.render("chat.ejs", {name:req.user.name, admin: req.user.admin, email:req.user.email})
})

chatRouter.get("/:email", authenticateToken, async ( req, res ) => {
  const email = req.params.email
  const messagesList = await service.getMessagesByEmail(email)
  res.render("myChatMessages.ejs", {email, messages:messagesList})
})

module.exports = chatRouter