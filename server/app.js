const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 5000;

io.on('connection', socket => {
  console.log('a user connected, socket id: ', socket.id);

  socket.emit('hiFromServer', 'You are connected');

  socket.on('fromClient', function(data) {
    console.log('A client ' + socket.id + ' is speaking to me: ' + data);    
  });
});


http.listen(port, () => {
  console.log('listening on: ' + port);
});