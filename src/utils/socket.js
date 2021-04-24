const { Server } = require("socket.io");
const io = new Server();

io.on('connection', function(client){
    console.log("Hello")
    client.on('join', function(data){
        client.broadcast.emit('newMember', data);
    });
});

io.listen(3000);
