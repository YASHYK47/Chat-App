var socket=io();
socket.on('connect',function(){
    console.log('Connected to server');
});
socket.on('diosconnect',function(){
    console.log('Disconnected from server');
});
socket.on('newMessage',function(msg){
    console.log('msg',msg);
});