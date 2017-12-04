const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 5000;

io.on('connection', socket => {
  console.log('a user connected, socket id: ', socket.id);
  socket.emit('hiFromServer', 'You are connected');
});

io.on('fromClient', socket => {
  console.log('A client is speaking to me!' );
  socket.emit('fromClient', 'Tadam');
});

http.listen(port, () => {
  console.log('listening on: ' + port);
});