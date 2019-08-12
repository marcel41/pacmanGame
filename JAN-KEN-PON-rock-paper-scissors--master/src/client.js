//function to write events we create a function
//that receives the message and post it on the events box
const writeEvent = (text) => {
  //the following if statement was made to create a score
  if(text.startsWith("You lost!!") || text.startsWith("You won!!")){
    const stringSplit = text.split(" ");
    text = stringSplit[0] + " " + stringSplit[1];
    if(stringSplit.length == 4)
      document.getElementById('score').innerHTML = stringSplit[2] + " : " + stringSplit[3];
  }
  //this is a ul element
  const parent = document.querySelector('#events');
  //<li> element
  const el = document.createElement('li');
  //this is for making inside <li> containing the text
  el.innerHTML = text;
  parent.appendChild(el);
};
//we created a function capable of having the event and handle
//the information that goes from the client to the server
const onFormSubmitted = (event) => {
 event.preventDefault();
//search for the class chat
 const input = document.querySelector('#chat');
//get the text from this class
 const text = input.value;
//get the input as zero and emit the message to the server
 input.value = '';
 sock.emit('message', text);
};
//call the function writeEvent to try our function
writeEvent('Welcome to GameBeta');
const addButtonListeners = () => {
  ['rock', 'paper', 'scissors'].forEach((id) => {
    const button = document.getElementById(id);
    button.addEventListener('click', () => {
      sock.emit('turn', id);
    });
  });
};
const sock = io();
//add an event listener with the method .on
//this mainly is used to recieve data from the server
sock.on('message', writeEvent);
//it is mainly used for sending information from the client
//to the server, I think that it works in this way
//1st it goes to the class chat-form there is waiting for
//information to be sent and once that this is submit
//this goes into our function onFormSubmitted
document
        .querySelector('#chat-form')
        .addEventListener('submit', onFormSubmitted)
addButtonListeners();
document.getElementById('score').innerHTML = "SCORE";
