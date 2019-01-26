var socket=io();
socket.on('connect',function(){
    console.log('Connected to server');
    socket.emit('createMessage',{
        to:'sheru',
        text:'huhuhu'
    })
});
socket.on('diosconnect',function(){
    console.log('Disconnected from server');
});
socket.on('newMessage',function(msg){
    console.log('msg',msg);
});