const socket = io();
let username = '';

document.getElementById('username-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const usernameInput = document.getElementById('username-input');
  username = usernameInput.value.trim();
  
  if (username) {
    document.getElementById('username-form').style.display = 'none';
    document.getElementById('message-form').style.display = 'block';
  }
});

document.getElementById('message-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  
  if (message && username) {
    socket.emit('newMessage', { username, text: message });
    messageInput.value = '';
  }
});

socket.on('initialMessages', function(messages) {
  const messagesList = document.getElementById('messages');
  messagesList.innerHTML = '';
  messages.forEach(function(message) {
    displayMessage(message);
  });
});

socket.on('message', function(message) {
  displayMessage(message);
});

function displayMessage(message) {
  const messagesList = document.getElementById('messages');
  const li = document.createElement('li');
  li.textContent = `${message.username}: ${message.text} (Posted at: ${new Date(message.timestamp).toLocaleString()})`;
  messagesList.appendChild(li);
}
