const express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');		
var pathFile = __dirname + '/templates/';
//	var indexRouter = require('./routes/index');
// var usersRouter = require('./template/users');

const app = express();

//app.set('view engine', 'html');	
app.set('views', path.join(__dirname, 'templates'));

app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile(pathFile + 'index.html');
});

app.get('/about_us', function(req, res) {
  res.sendFile(pathFile + 'about_us.html');
});

app.get('/profile', function(req, res) {
  res.sendFile(pathFile + 'profile.html');
});

app.get('/australia', function(req, res)	 {
  res.sendFile(pathFile + 'australia.html');
});
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use('/', indexRouter);

// app.use(function(req, res, next) {
//   next(createError(404));
// });

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


//app.use('/users', usersRouter);

// app.get('/', function(req, res) {
// 	res.send('index.html');
// })
//module.exports = app;

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
})