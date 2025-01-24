const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3500;

// Middleware to serve static files
app.use(express.static('public'));

app.use(bodyParser.json());

let messages = [];

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.emit('initialMessages', messages);

  socket.on('newMessage', (data) => {
    const { username, text } = data;
    const message = { username, text, timestamp: new Date() };
    messages.push(message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
