const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',function(socket){
    console.log('New user connected');

    socket.emit('newMessage',{
        from:'shery',
        text:'hehehe',
        createdAt:123
    });
     
    socket.on('createMessage',function(newmsg){
        console.log('create Message:',newmsg);
    })

    socket.on('disconnect',function(){
        console.log('User Disconnected');
    })
});

server.listen(port,()=>{
    console.log(`Server running on ${port}`);
});