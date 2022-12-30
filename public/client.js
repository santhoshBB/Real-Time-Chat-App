
const socket= io();
let textarea= document.querySelector('.text');
let messageArea = document.querySelector('#messageArea');

let user;
do {
   user= prompt('Enter your name:')
} while (!user);

textarea.addEventListener('keyup', (e) => {
     if(e.key === 'Enter'){
        sendMessage(e.target.value)
     }
})



function sendMessage(message){
    let d= new Date()
    const time= `${d.getHours()}:${d.getMinutes()}`
    let msg ={
        user: user,
        message:message,
        time:time
    }

    //appending on dom

    appendMessage(msg, 'outgoing')
    textarea.value=''

    // send to server side
     socket.emit('message', msg)

}


function appendMessage(msg, type) {
    
    let mainDiv = document.createElement('div')
    let className = type;
    mainDiv.classList.add(className);
    mainDiv.innerHTML = ` 
    <h6>${msg.user}: ${msg.message} <sub>${msg.time}</sub></h6>`
    messageArea.appendChild(mainDiv);


    //scroll
    updateScroll();
}

// receiving msgs that r broacasted ('incoming')
socket.on('message',(msg) => {
     appendMessage(msg, 'incoming')
})


//scroll to bottom
function updateScroll(){
    messageArea.scrollTop = messageArea.scrollHeight;
}