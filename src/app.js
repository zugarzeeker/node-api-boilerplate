import routes from './routes';
import authenticator from './middlewares/authenticator';

const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
// const path = require('path');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
// const multer = require('multer');
const cors = require('cors');
const config = require('config');

// const upload = multer({ dest: path.join(__dirname, 'uploads') });

mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI || config.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

const app = express();
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
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI || config.MONGOLAB_URI,
    autoReconnect: true
  })
}));
app.use(flash());
app.use((req, res, next) => {
  if (req.path === '/api/upload') {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(cors());
app.use(authenticator);
app.use('/', routes);
app.use(errorHandler());

export default app;
