/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const app = express();
const logger = require('./logger');
const bodyParser = require('body-parser');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const config = require('../config')
const isDev = process.env.NODE_ENV !== 'production';
const userRouter = require('./router')
const mongoose = require('mongoose');
const fileupload = require("express-fileupload");


const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
app.use(fileupload());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use('/api', userRouter);


// In production we need to pass these values in instead of relying on webpack

console.log("-------------->s", __dirname );
// app.use("/public",express.static(__dirname +'/public'));
app.use("/uploads",express.static(__dirname +'/public/uploads'));


setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});


// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});

mongoose.connect(config.URL+ config.DBNAME, { useNewUrlParser: true ,useFindAndModify: false}).then(() => {
  console.log(config.URL+ config.DBNAME, 'Database is connected') 
  },
  err => { console.log('Can not connect to the database'+ err)}
);
