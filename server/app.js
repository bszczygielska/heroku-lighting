const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

/**
 * Establishing io connection
 */
const port = 5000;

http.listen(port, () => {
  console.log('io server listening on: ' + port);
});

io.on('connection', socket => {
  console.log('a user connected, socket id: ', socket.id);

  socket.emit('hiFromServer', 'You are connected');

  socket.on('fromClient', function (data) {
    console.log('A client ' + socket.id + ' is speaking to me!: ' + data);
    io.emit('toSimulation', data);
  });

  socket.on('createLight', function (data) {
    const bulb = new LightBulb({name: 'Brighty'});
    bulb.save(function (err, bulb) {
      (err) ? console.log(err) : bulb.speak();
    });
  })
});

io.on('disconnect', function (data) {
  console.log('user disconnected', data);
});

/**
 * Connecting with db
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongoose connected!!')
});

/**
 * Data schema
 */
const lightBulbSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: Boolean,
    default: false
  },
  r: {
    type: Number,
    required: false,
    default: 255,
  },
  g: {
    type: Number,
    required: false,
    default: 255,
  },
  b: {
    type: Number,
    required: false,
    default: 255,
  },
  s: {
    type: Number,
    required: false,
    default: 255,
  },
  p: {
    type: Number,
    required: false,
    default: 255,
  },
});

lightBulbSchema.methods.speak = function () {
  console.log(`Hi Im your new light bulb ${this.name}, shall I lighten?`)
};

const LightBulb = mongoose.model('LightBulb', lightBulbSchema);

const lightSceneSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lights: {
    type: [lightBulbSchema],
    required: true,
  }
});

const LightScene = mongoose.model('LightScene', lightSceneSchema);

/**
 *  Routes
 */
app.get('/', function (req, res) {
  res.json({message: 'hooray! welcome to our api!'});
});

app.get('/addLight', function (req, res) {
  let bulb = new LightBulb(req.body);
  try {
    bulb.save(function (err, bulb) {
      (err) ? console.log(err) : bulb.speak();
    });
    res.json({message: 'light created successfully'});
  } catch (err) {
    console.log(err.message);
    res.json({message: err.message})
  }
});

app.get('/lights', function (req, res) {
  res.json(LightBulb.find(function (err, lights) {
    if (err) return console.error(err);
    console.log(lights);
  }))
});


LightBulb.find(function (err, lights) {
  if (err) return console.error(err);
  console.log(lights);
});


