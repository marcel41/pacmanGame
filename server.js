const http = require('http');
const express = require('express');
//we need another to make the communication possible
//between our server and the client
const socketio = require('socket.io');
const app = express();
var port = process.env.PORT || 8080
//create a middleware (a software glue) for the static files
//but first need the location (dirname) points to current
//module (folder) so to host the clientpage we have to
//go a level up and go to client folder
app.use(express.static(__dirname + "/"));
//create a server using the method http.create server
//set up routes
const server = http.createServer(app);
//call the socketio using your server
const io = socketio(server);
io.on('connection', (sock) => {
    sock.emit('message', 'Hi, you are connected');
    console.log('connection established ');
});

server.listen(port, () => {
    console.log("server has started in " + port);
})
