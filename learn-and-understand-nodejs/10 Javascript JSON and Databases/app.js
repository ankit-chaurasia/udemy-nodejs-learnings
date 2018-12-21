var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://test:Pass123@ds147964.mlab.com:47964/addressbook');

var Schema = mongoose.Schema;

var personSchema = new Schema({
  firstname: String,
  lastname: String,
  address: String
});

var Person = mongoose.model('Person', personSchema);

var john = Person({
  firstname: 'John',
  lastname: 'Doe',
  address: '555 street'
});

// save the use
john.save(function(err) {
  if (err) throw err;
  console.log('Person Saved');
});

var jane = Person({
  firstname: 'jane',
  lastname: 'Doe',
  address: '222 street'
});

// save the use
jane.save(function(err) {
  if (err) throw err;
  console.log('Person Saved');
});

var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

// This will look for view files inside views folder
app.set('view engine', 'ejs');

app.use('/', function(req, res, next) {
  console.log(req.url);
  // Get all the users
  Person.find({}, function(err, users) {
    if (err) throw err;
    console.log(users);
  });
  next(); // call next middleware
});

apiController(app);
htmlController(app);

app.listen(port);
