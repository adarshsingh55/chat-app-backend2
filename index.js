const io =require("socket.io")(process.env.PORT || 8000)
// const express = require('express')
// const cors = require("cors")
const user={}
// const app = express() 
// io.use(cors())
// app.use(cors())
io.on('connection',Socket=>{
    Socket.on('new-user-joined',name=>{
        // console.log("name is :",name );
   user[Socket.id] =name ;
   Socket.broadcast.emit('user-joined',name);
    });
  Socket.on('send',message=>{
    Socket.broadcast.emit('receive',{message:message,name:user[Socket.id]})
  });
  Socket.on('disconnect',message=>{
    Socket.broadcast.emit('leave',{name:user[Socket.id]})
    delete user[Socket.id]
  });
})