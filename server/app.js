const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

const port = 5000;
try {
  http.listen(port, () => {
    console.log('io server listening on: ' + port);
  });

  /**
   * Connecting with db
   */
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/tests')
    .catch(err => {
      console.error('App starting error:', err.stack);
      process.exit(1);
    });

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

  const sceneLightSchema = mongoose.Schema({
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
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

  const lightSceneSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    sceneLights: {
      type: [sceneLightSchema],
      required: true,
    }
  });

  const LightScene = mongoose.model('LightScene', lightSceneSchema);

  app.use(bodyParser.json());

  app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    next();
  });

  /**
   *  Routes
   */
  app.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
  });

  app.get('/lights', function (req, res) {
    try {
      LightBulb.find(function (err, lights) {
        if (err) return console.error(err);
        res.json(lights);
      })
    } catch (err) {
      res.json({message: err.message, errCode: err.statusCode})
    }
  });

  app.post('/lights', function (req, res) {
    let bulb = new LightBulb(req.body);
    try {
      bulb.save(function (err, bulb) {
        if (err)
          throw new Error(err);
        res.json({message: 'light created successfully', light: bulb});
        bulb.speak();
      });
    } catch (err) {
      res.json({message: err.message, errCode: err.statusCode})
    }
  });

  app.put('/lights/:lightId', function (req, res) {
    try {
      LightBulb.updateOne({_id: req.params._id}, res.body, function (err, res) {
        if (err)
          throw new Error(err);
        res.json({message: 'light updated succesfully'})
      });
    } catch (err) {
      res.json({message: err.message, errCode: err.statusCode})
    }
  });

  app.delete('/lights/:lightId', function (req, res) {
    try {
      LightBulb.deleteOne({_id: req.params._id}, function (err) {
        if (err)
          throw new Error(err);
        res.json({message: 'light deleted successfully'})
      });
    } catch (err) {
      res.json({message: err.message, errCode: err.statusCode})
    }
  });

  app.get('/lightScenes', function (req, res) {
    try {
      LightScene.find(function (err, scenes) {
        if (err) throw new Error(err);
        res.json(scenes);
      })
    } catch (err) {
      res.json({message: err.message, errCode: err.statusCode})
    }
  });

  app.post('/lightScenes', function (req, res) {
    let scene = new LightScene(req.body);
    try {
      scene.save(function (err, scene) {
        if (err)
          throw new Error(err)
        res.json({message: 'lightScene created successfully'});
      });
    } catch (err) {
      res.json({message: err.message, errCode: err.statusCode})
    }
  });

  app.put('/lightScenes/:lightSceneId', function (req, res) {
    try {
      scene.save(function (err, scene) {
        if (err)
          throw new Error(err);
        res.json({message: 'lightScene updated successfully'});
      });
    } catch (err) {
      res.json({message: err.message, errCode: err.statusCode})
    }
  });

  app.delete('/lightScenes/:lightSceneId', function (req, res) {
    try {
      LightScene.deleteOne({_id: req.params._id}, function (err) {
        if (err)
          throw new Error(err)
        res.json({message: 'lightScene deleted successfully'});
      });
    } catch (err) {
      res.json({message: err.message, errCode: err.statusCode})
    }
  });


} catch (e) {
  console.warn(e.message)
}