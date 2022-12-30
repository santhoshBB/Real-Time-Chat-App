const express= require('express');
const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3001

app.use(express.static(__dirname + '/public'))

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})

http.listen(PORT, ()=>{
    console.log(`connected on port ${PORT}`);
})


//socket connection
const io = require('socket.io')(http);

io.on('connection',(socket) => {
    console.log('a user connected') 

    //listening emitted event from client side
    socket.on('message',(msg) => {
      //brodcast to all pages
      socket.broadcast.emit('message',msg)
    })
})