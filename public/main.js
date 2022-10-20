const socket = io();

const userForm = document.getElementById("userMessageForm")
const inputUserMessage = document.getElementById("userMessage")
const systemForm = document.getElementById("systemMessageForm")
const inputSystemMessage = document.getElementById("systemMessage")
const email = (document.getElementById("email")).innerHTML
const selectEmail = document.getElementById("selectEmail")

if (userForm) {
  userForm.addEventListener("submit",(e) => {
    e.preventDefault()

    const messageContent = inputUserMessage.value
    if (messageContent === "") {
      alert("El mensaje no puede estar vacío")
    } else {
      const userMessage = {
        email: email,
        type: "user",
        message: messageContent
      }
      socket.emit("new_message",userMessage)
      inputUserMessage.value = ""
    }
  })
}

if (systemForm) {
  systemForm.addEventListener("submit",(e) => {
    e.preventDefault()

    const emailToAnswer = selectEmail.value
    const messageContent = inputSystemMessage.value
    if (emailToAnswer === "") {
      alert("Debe seleccionar un email para responder")
    } else {
      const systemMessage = {
        email: emailToAnswer,
        type: "system",
        date: new Date(),
        message: messageContent
      }
      socket.emit("new_message",systemMessage);
      inputSystemMessage.value = "";
    }
  })
}

const createTagMessage = (message) => {
  if (message.type === "user") {
    return (`
      <li class="messageContainer">
        <div class="message">
          <div class="green">${message.email}:</div> <div>${message.message}</div>
        </div>
        <div class="message">
          <div class="green"> Fecha:</div> <div>${message.date}</div>
        </div>
      </li>
    `)
  } else {
    return (`
    <li class="messageContainer">
      <div class="message"> 
        <div class="green">Sistema:</div> <div>${message.message}</div> 
      </div>
      <div class="message">
        <div class="brown"> Para: ${message.email}</div> 
      </div>
      <div class="message">
        <div class="green">Fecha:</div> <div> ${message.date}</div>
      </div>
      
    </li>
  `)
  }
}

const createOptionTags = (messages) => {
  if (selectEmail) {
    while (selectEmail.firstChild) {
      selectEmail.removeChild(myNode.lastChild);
    }
    const emails = getEmails(messages)
    emails.forEach(email => {
      const newOption = document.createElement("option")
      const optionText = document.createTextNode(email)
      newOption.appendChild(optionText)
      selectEmail.appendChild(newOption)
    })
  }
}

const getEmails = (messages) => {
  let newList = []
  messages.forEach(item => {
    if (!(newList.includes(item.email))) {
      newList.push(item.email)
    }
  });
  return newList
}

const renderMessages = (messages) => {
  const messagesList = messages.map(message => createTagMessage(message)).join(" ");
  const messageContainer = document.getElementById("messagesContainer")
  if (messageContainer) messageContainer.innerHTML = messagesList;
  createOptionTags(messages)
}

socket.on("messages",(messages) => {
  renderMessages(messages)
})