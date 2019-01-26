const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
var {generateMessage,generateLocationMessage}=require('./utils/message.js')

app.use(express.static(publicPath));

io.on('connection',function(socket){
    console.log('New user connected');
     
    socket.emit('newMessage',generateMessage('Admin','Welcome to the ChatApp'));
   
    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'))
   
    socket.on('createMessage',function(message){
        console.log('create Message:',message);
        io.emit('newMessage',generateMessage(message.from,message.text));
    });
    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });
    socket.on('disconnect',function(){
        console.log('User Disconnected');
    })
});

server.listen(port,()=>{
    console.log(`Server running on ${port}`);
});