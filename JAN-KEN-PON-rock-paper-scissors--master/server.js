//for importing a starting module http for sending
//stream of data (for more information read API Node)
const http = require('http');
//express module obviously
const express = require('express');
//we need another to make the communication possible
//between our server and the client
const socketio = require('socket.io');
const RpsGame = require('./rps-game');
//make an app which at the same time is an object and
//a function to handle the connections
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
const io = socketio(server);

let waitingPlayer = null;
//whenever someone connect you need a method
//it needs to be typed exaclty like that
io.on('connection', (sock) => {
  sock.emit('message', 'Hi, you are connected');
  //we use an if statement to make possible the start of the game
  if(waitingPlayer){
    //notice how to create "objects" in javascript
    new RpsGame(waitingPlayer, sock);
    waitingPlayer = null;
  } else {
    waitingPlayer = sock;
    waitingPlayer.emit('message', 'wait for an opponent');
  }
  console.log('connection established ');
  sock.on('message', (text) => {
    io.emit('message', text);
  });
});
//create a way to handle errors
server.on('error', (err) => {
  console.error('server error', err);
});
//a server always needs to listen to something in this case
//a port 8080 IMPORTANT notice how a functions was created
//in the call of this function
server.listen(port, () =>{
  console.log('the server is on');
});
