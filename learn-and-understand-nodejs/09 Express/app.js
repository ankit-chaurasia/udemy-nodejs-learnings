var express = require('express');
var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');
var app = express();

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

// This will look for view files inside views folder
app.set('view engine', 'ejs');

app.use('/', function(req, res, next) {
  console.log(req.url);
  next(); // call next middleware
});

apiController(app);
htmlController(app);

app.listen(port);
