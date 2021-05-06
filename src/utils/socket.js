const app = require("../index");
const httpServer = require('http').createServer(app);
const {Server} = require("socket.io");

global.io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["*"],
        credentials: true
    },
    allowEIO3: true
});

httpServer.listen(5000);

console.log('Server is running...')