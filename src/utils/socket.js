const httpServer = require('http').createServer();
const {Server} = require("socket.io");
global.io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["*"],
        credentials: true
    },
    allowEIO3: true
});

httpServer.listen(3000);

console.log('Server is running...')