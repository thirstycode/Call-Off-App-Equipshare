var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var bodyParser   = require('body-parser');
var session = require('express-session');
// var empty = require('is-empty');
var cors = require('cors');

// var fileUpload = require('express-fileupload');
// var dateTime = require('node-datetime');
// var expressSanitized = require('express-sanitize-escape');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
// app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'supersecretkey',resave: true, saveUninitialized: true ,cookie: { maxAge:48*60*60*1000, }}));
// app.use(fileUpload());
// app.use(expressSanitized());

var api = require('./routes/api');
app.use('/api', api);

var indexRouter = require('./routes/index');
app.use('/', indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
