
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 5000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection',  socket => {
  console.log('a user connected');
  socket.emit('hiFromServer', );
});

http.listen(port, () => {
  console.log('listening on: ' + port);
});