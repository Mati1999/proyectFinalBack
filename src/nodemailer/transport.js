require("dotenv").config();

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service:"gmail",
    port: 587,
    auth: {
        user: process.env.GMAIL_ADMIN,
        pass: process.env.GMAIL_PWD
    }
})
module.exports = transport
