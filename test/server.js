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
const clientPath = `${__dirname}`;
console.log(`Serving static from ${clientPath}`);
app.use(express.static(clientPath));
//create a server using the method http.create server
//set up routes
app.get("/",function(req, res){
  res.render(clientPath + 'index.html');
});
const server = http.createServer(app);
//call the socketio using your server

server.listen(port, () => {
    console.log("server has started in " + port);
})
