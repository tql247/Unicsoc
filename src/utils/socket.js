const app = require("../index");
const httpServer = require('http').createServer(app);
const {Server} = require("socket.io");
const PORT = process.env.PORT || 5000

global.io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["*"],
        credentials: true
    },
    allowEIO3: true
});

httpServer.listen(PORT);

console.log('Server is running...')