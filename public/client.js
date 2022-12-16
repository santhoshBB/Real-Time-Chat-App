const socket= io();
let textarea= document.getElementById("textarea")
let messageArea= document.getElementById("msgarea")


let user;
do {
    user= prompt("Please enter your name to chat ")
} while (!user);

textarea.addEventListener('keyup', (e) => {
    var message= e.target.value
     if(e.key === 'Enter' ){
        sendMessage(message)
     }  

    
})

sendMessage(`Hello ${user} welcome to Live chat room`)






//auto scroll to bottom
function updateScroll(){
    var element = document.getElementById("msgarea");
    element.scrollTop = element.scrollHeight;
}


function sendMessage(message){
    let d= new Date()
    const time= `${d.getHours()}:${d.getMinutes()}`
    let msg ={
        user:user,
        message:message,
        time:time
    }

    appendMessage(msg, "outgoing")
    // textarea.value=''
   
    socket.emit('message',msg )
   
}

function appendMessage(msg, type) {
    
    let mainDiv= document.createElement('div')
    let className= type
    mainDiv.classList.add(className, 'message')
    let markUp=` 
    <h6>${msg.user}~</h6>
    <p>${msg.message} <sub>${msg.time}</sub></p>
    `
    mainDiv.innerHTML=markUp
    messageArea.appendChild(mainDiv)
    // appending users
    updateScroll();
}

//receiving the msg //by broadcast

socket.on('message', (msg) => {
     appendMessage(msg, "incoming")
})