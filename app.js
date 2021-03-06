var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var routes = require('./routes/index');
var messages = require('./routes/messages');
var users = require('./routes/users');

var app = express();

// uncomment after placing your favicon in /public

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use(function(req, res, next){
  var token = req.headers.authentication;
  if(token){
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    knex('users').where({id: decoded.userId}).first().then(function(user){
      delete user.password;
      req.user = user;
      next();
    }).catch(function(err){
      console.log(err);
      next();
    })
  }else{
    next();
  }
})

// app.use(function(req, res, next){
//   req.user = {
//     name: "Seth",
//     phone: '+17208973791',
//     twilioID: "AC97360b975ad105d73717bbe511677539",
//     token: "fee511e61fa7b8a25918e4915eb45b5f"
//   }
//   next();
// })

app.use('/', routes);
app.use('/api/v1/users', users);
app.use('/api/v1/messages', messages);

app.use('/*', function (req, res, next) {
 res.sendFile('index.html', {root: __dirname + '/public/'});
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.json({
    message: err.message,
    error: err
  });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


module.exports = app;
