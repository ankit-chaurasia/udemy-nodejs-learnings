// var Emitter = require('./emitter');
var Emitter = require('events');
var eventConfg = require('./config').events;

var emitter = new Emitter();

emitter.on(eventConfg.GREET, function() {
  console.log('greet1');
});

emitter.on(eventConfg.GREET, function() {
  console.log('greet2');
});

emitter.emit(eventConfg.GREET);
