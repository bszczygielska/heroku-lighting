const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
/**
 * Establishing io connection
 */
const port = 5000;

http.listen(port, () => {
  console.log('io server listening on: ' + port);
});

/**
 * Connecting with db
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/aa');

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

app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  next();
});

/**
 *  Routes
 */
app.get('/', function (req, res) {
  res.json({message: 'hooray! welcome to our api!'});
});

app.post('/addLight', function (req, res) {
  let bulb = new LightBulb(req.body);
  try {
    bulb.save(function (err, bulb) {
      if (err)
        console.log(err)
      res.json({message: 'light created successfully'});
      bulb.speak();
    });
  } catch (err) {
    console.log(err.message);
    res.json({message: err.message})
  }
});

app.get('/lights', function (req, res) {
  LightBulb.find(function (err, lights) {
    if (err) return console.error(err);
    res.json(lights);
  })
});