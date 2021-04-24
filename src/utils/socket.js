const httpServer = require('http').createServer();
const {Server} = require("socket.io");
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5000",
        methods: ["*"],
        credentials: true
    },
    allowEIO3: true
});

io.on('connection', function(client) {
    console.log('hello')
    client.on('join', function(data) {
        client.broadcast.emit('newMember', data);
    });
    client.on('message', function(data) {
        // client.emit('thread', data);
        client.broadcast.emit('thread', data);
    });

    client.on('disconnect', function(reason) {
        console.log(reason);
        client.broadcast.emit('leave');
    });
});

httpServer.listen(3000);

console.log('Server is running...')