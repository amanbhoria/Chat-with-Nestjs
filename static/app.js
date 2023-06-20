const socket = io('http://localhost:3002');
const msgBox = document.getElementById('exampleFormControlTextarea1');
const msgCont = document.getElementById('data-container');
const email = document.getElementById('email');
const name = document.getElementById('name');
const clearButton = document.getElementById('clearButton');
const clearIndiv = document.getElementById('clearIndividual');

//get old messages from the server
let messages = [];
let emails = [];
const getMessages = async() => {
  fetch('http://localhost:3002/api/chat')
    .then((response) => response.json())
    .then((data) => {
      loadDate(data);
      data.forEach((el) => {
        messages.push(el);
      });
    })
    .catch((err) => console.error(err));
}
getMessages();

const clearChat = async() => {
    fetch('http://localhost:3002/api/chat/delete')
        .then(response => console.log(response))
        .catch(error => console.log(error));
}

const clearIndividual = async(email) => {
    fetch(`http://localhost:3002/api/chat/deleteSingle?email=${email}`)
        .then(response => console.log(response))
        .catch(error => console.log(error));
}

//When a user press the enter key,send message.
msgBox.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    sendMessage({ email: email.value, text: e.target.value, name: name.value });
    e.target.value = '';
  }
});

clearButton.addEventListener('click', (e) => {
    clearChat().then(r => console.log('successful'));
    window.location.reload();
})

clearIndiv.addEventListener('click', (e) => {
    clearIndividual(email.value).then(r => console.log('successful'));
    console.log(email.value);
    window.location.reload();
})


//Display messages to the users
function loadDate(data) {
  let messages = '';
  data.map((message) => {
    messages += ` <li class="mb-3">
       <span class="fw-bolder bg-primary rounded mb-2 p-2 text-light">${message.email}</span>
       <span class="bg-primary rounded mb-2 p-1 text-light">${message.text}</span>
       <span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg></span>
     </li>
`;
  });
  msgCont.innerHTML = messages;
}

//socket.io
//emit sendMessage event to send message
function sendMessage(message) {
  socket.emit('sendMessage', message);
}

//Listen to recMessage event to get the messages sent by users
socket.on('recMessage', (message) => {
  messages.push(message);
  loadDate(messages);
});
