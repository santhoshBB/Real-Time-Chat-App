const socket= io();
let textarea= document.getElementById("textarea")
let messageArea= document.getElementById("msgarea")

let user;
do {
    user= prompt("Please enter your name to chat ")
} while (!user);


textarea.addEventListener('keyup', (e) => {
     if(e.key === 'Enter'){
        sendMessage(e.target.value)
     }
})

function sendMessage(message){
    let msg ={
        user:user,
        message:message.trim()
    }
    appendMessage(msg, "outgoing")
    textarea.value=''
    
    socket.emit('message',msg )
}

function appendMessage(msg, type) {
    let mainDiv= document.createElement('div')
    let className= type
    mainDiv.classList.add(className, 'message')
    let markUp=` <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markUp
    messageArea.appendChild(mainDiv)
}

//receiving the msg //by broadcast

socket.on('message', (msg) => {
     appendMessage(msg, "incoming")
})