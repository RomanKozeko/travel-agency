/**
 * Module dependencies.
 */
require('babel-polyfill');
require('ignore-styles');
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/apiRoutes');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.example' });

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3003);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true,
    clear_interval: 3600
  })
}));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build'), { maxAge: -31557600000 }))
// }

app.use('/api', apiRouter);
app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, '../client'), { maxAge: -31557600000 }));


/**
 * Error Handler.
 */
app.use((err, req, res, next) => {
  res.status(500);
  res.send({message: err.message })
});

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
