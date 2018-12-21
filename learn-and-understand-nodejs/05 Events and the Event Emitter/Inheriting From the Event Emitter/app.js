var EventEmitter = require('events');
// var util = require('util');

function Greet() {
  EventEmitter.call(this);
  this.greeting = 'Hello';
}

// Any objects created from Greet will also have access to EventEmitter object
// util.inherits(Greet, EventEmitter);

Greet.prototype = new EventEmitter();

Greet.prototype.greet = function() {
  console.log(this.greeting);
  this.emit('greet');
};

var greet1 = new Greet();
greet1.on('greet', function() {
  console.log('greet');
});
greet1.addListener('greet', function() {
  console.log('greet with addListener');
});
greet1.greet();
