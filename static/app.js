const socket = io('http://localhost:3002');
const msgBox = document.getElementById('exampleFormControlTextarea1');
const msgCont = document.getElementById('data-container');
const email = document.getElementById('email');
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
    sendMessage({ email: email.value, text: e.target.value });
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
    messages += ` <li class="bg-primary p-2 rounded mb-2 text-light">
       <span class="fw-bolder">${message.email}</span>
       ${message.text}
     </li>`;
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
