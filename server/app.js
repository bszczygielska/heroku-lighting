const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

try {
  app.use(express.static('../client/build'));

  process.on('uncaughtException', (function(error) {
    console.error(error)
  }));

  process.on('error', (function(error) {
    console.error(error)
  }));

  http.listen(port, () => {
    console.log('io server listening on: ' + port);
  });

  /**
   * Connecting with db
   */

  mongoose.connect('mongodb://dbuser:dbPassword1@ds159772.mlab.com:59772/heroku_6nhrd1gm')
    .catch(err => {
      console.error('App starting error:', err.stack);
      process.exit(1);
    });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('mongoose connected!!');
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
    hue: {
      type: Number,
      required: false,
      default: 0,
    },
    saturation: {
      type: Number,
      required: false,
      default: 0,
    },
    lightness: {
      type: Number,
      required: false,
      default: 100,
    },
    hex: {
      type: String,
      required: false,
      default: '',
    },
  });

  lightBulbSchema.methods.speak = function() {
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
    hue: {
      type: Number,
      required: false,
      default: 0,
    },
    saturation: {
      type: Number,
      required: false,
      default: 0,
    },
    lightness: {
      type: Number,
      required: false,
      default: 100,
    },
    hex: {
      type: String,
      required: false,
      default: '',
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
    },
    state: {
      type: Boolean,
      default: false,
    }
  });

  const LightScene = mongoose.model('LightScene', lightSceneSchema);

  app.use(bodyParser.json());

  app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    next();
  });

  /**
   *  Routes
   */
  app.get('/api/lights', async function(req, res, next) {
    try {
      const lights = await LightBulb.find();
      console.log(lights);
      res.status(200).json(lights);
    } catch (exception) {
      next(exception);
    }
  });

  app.post('/api/lights', async function(req, res, next) {
    try {
      let createdBulb = new LightBulb(req.body);
      await createdBulb.save();
      res.status(200).json({ message: 'light created successfully', light: createdBulb });
      createdBulb.speak();
    } catch(exception) {
      next(exception);
    }
  });

  app.put('/api/lights/:lightId', async function(req, res, next) {
    try {
      let updatedBulb = await LightBulb.updateOne({ _id: req.params.lightId }, req.body);
      updatedBulb.save();
       res.status(200).json({ message: 'light updated succesfully', light: updatedBulb })
    } catch (exception) {
      next(exception)
    }
  });

  app.delete('/api/lights/:lightId', async function(req, res, next) {
    try {
      await LightBulb.deleteOne({ _id: req.params.lightId });
      res.json({ message: 'light deleted successfully' })
    } catch (exception) {
      next(exception)
    }
  });

  app.get('/api/lightScenes', async function(req, res, next) {
    try {
      const lightScenes = await LightScene.find();
      res.status(200).json(lightScenes);
    } catch (exception) {
      next(exception)
    }
  });

  app.post('/api/lightScenes', async function(req, res, next) {
    try {
      let lightScene = new LightScene(req.body);
      await lightScene.save();
      res.json({ message: 'lightScene created successfully', scene: lightScene });
    } catch (exception) {
      next(exception)
    }
  });

  app.put('/api/lightScenes/:lightSceneId', async function(req, res, next) {
    try {
      const lightScene = await LightScene.findById(req.params.lightSceneId);
      lightScene.set(req.body);
      await lightScene.save();
      res.status(200).json({message: `lightScene updated successfully`, scene: lightScene})
    } catch (exception) {
      next(exception)
    }
  });

  app.delete('/api/lightScenes/:lightSceneId', async function(req, res, next) {
    try {
      await LightScene.deleteOne({ _id: req.params.lightSceneId });
      res.status(200).json({ message: 'lightScene deleted successfully' });
    } catch (exception) {
      next(exception)
    }
  });

  app.get('*', (req, res) => {
    res.sendFile('client/build/index.html', { root: '../'});
  });

  app.use(function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err)
  })

} catch (e) {
  console.warn(e.message)
}