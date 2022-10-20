const transport = require("../transport")

const sendEmailNewOrder = (fromEmail,toEmail,order) => {
  let li = ""
  order.products.forEach(product => {
    li = li + `<li> ${product.title} - quantity: ${product.quantity} </li>`
  })
  transport.sendMail({
    from: `Matias ${fromEmail}`,
    to: toEmail,
    html: `<h1>List of items:</h1>
            <ul> 
                ${li}
            </ul>
          <h2> Shipping Address: ${order.shippingAddress} </h2>
          <h2> Total: ${order.total}$ </h2>`,
    subject: `New Purchase from the User: ${order.email}`
  }).then((data) => {
    console.log("Email enviado");
  }).catch(console.log)
}

const sendEmailNewUser = (fromEmail,toEmail,user) => {
  transport.sendMail({
    from: `Matias ${fromEmail}`,
    to: toEmail,
    html: `<h1>New user details:</h1>
            <ul> 
                <li>Email: ${user.email}</li>
                <li>Name: ${user.name}</li>
                <li>Surname: ${user.surname}</li>
                <li>Tel: ${user.tel}</li>
                <li>Address: ${user.address}</li
            </ul>`,
    subject: `New User Created: ${user.email}`
  }).then((data) => {
    console.log("Email enviado");
  }).catch(console.log)
}

module.exports = { sendEmailNewOrder,sendEmailNewUser }