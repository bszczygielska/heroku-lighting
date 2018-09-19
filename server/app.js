const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

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
  app.get('/api/lights', function(req, res, next) {
    try {
      LightBulb.find(function(err, lights) {
        if (err) throw err;
        res.json(lights);
      })
    } catch (err) {
      res.json({ message: err.message, errCode: err.statusCode })
    }
  });

  app.post('/api/lights', async function(req, res, next) {
    try {
      let bulb = new LightBulb(req.body);
      await bulb.save();
      res.json({ message: 'light created successfully', light: bulb });
      bulb.speak();
    } catch(exception) {
      next(exception);
    }
  });

  app.put('/api/lights/:lightId', function(req, res, next) {
    try {
      LightBulb.updateOne({ _id: req.params._id }, req.body, function(err, res) {
        if (err)
          throw new Error(err);
        res.json({ message: 'light updated succesfully' })
      });
    } catch (err) {
      res.json({ message: err.message, errCode: err.statusCode })
    }
  });

  app.delete('/api/lights/:lightId', function(req, res, next) {
    try {
      LightBulb.deleteOne({ _id: req.params._id }, function(err) {
        if (err)
          throw new Error(err);
        res.json({ message: 'light deleted successfully' })
      });
    } catch (err) {
      res.json({ message: err.message, errCode: err.statusCode })
    }
  });

  app.get('/api/lightScenes', function(req, res, next) {
    try {
      LightScene.find(function(err, scenes) {
        if (err) throw new Error(err);
        res.json(scenes);
      })
    } catch (err) {
      res.json({ message: err.message, errCode: err.statusCode })
    }
  });

  app.post('/api/lightScenes', function(req, res, next) {
    let scene = new LightScene(req.body);
    try {
      scene.save(function(err, scene) {
        if (err)
          throw new Error(err);
        res.json({ message: 'lightScene created successfully', scene: scene });
      });
    } catch (err) {
      res.json({ message: err.message, errCode: err.statusCode })
    }
  });

  app.put('/api/lightScenes/:lightSceneId', function(req, res, next) {
    let data = {};
    try {
      LightScene.findById(req.params.lightSceneId, function (err, scene) {
        if (err) {
          data = err.message
        } else {
          scene.set(req.body);
          scene.save(function(err) {
            data = err ? err.message : 'Scene updated successfully';
          })
        }
        res.send(data)
      })
    } catch (err) {
      res.json({ message: err.message, errCode: err.statusCode })
    }
  });

  app.delete('/api/lightScenes/:lightSceneId', function(req, res, next) {
    try {
      LightScene.deleteOne({ _id: req.params.lightSceneId }, function(err) {
        if (err)
          throw new Error(err)
        res.json({ message: 'lightScene deleted successfully' });
      });
    } catch (err) {
      res.json({ message: err.message, errCode: err.statusCode })
    }
  });

  app.get('*', (req, res) => {
    res.sendFile('client/build/index.html', { root: '../'});
  });

  app.use(function errorHandler(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send(err)
  })

} catch (e) {
  console.warn(e.message)
}