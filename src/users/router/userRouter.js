const express = require("express");
const userRouter = express.Router()

userRouter.use(express.json())
userRouter.use(express.urlencoded({ extended: false }));

const { registration,authenticationCheck,authenticateToken } = require("../../middlewares/auth");
const UserService = require("../service/UserService");
const userService = new UserService(process.env.DATA_BASE_USERS)

userRouter.get("/",authenticateToken,(req,res) => {
  res.redirect("/products")
})

userRouter.get("/register",authenticateToken,(req,res) => {
  res.render("register.ejs")
})

userRouter.post("/register",registration,(req,res) => {
  res.redirect("/products")
})

userRouter.get("/login",authenticateToken,(req,res) => {
  res.render("login.ejs")
})

userRouter.post("/login",authenticationCheck,(req,res) => {
  res.redirect("/products")
})

userRouter.get("/logout",authenticateToken,(req,res) => {
  res.clearCookie("token")
  res.redirect("/login")
})

module.exports = userRouter