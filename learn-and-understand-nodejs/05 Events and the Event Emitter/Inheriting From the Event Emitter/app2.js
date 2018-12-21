var util = require('util');
function Person() {
  this.firstName = 'John';
  this.lastName = 'Doe';
}

Person.prototype.greet = function() {
  console.log('Hello, ' + this.firstName + ' ' + this.lastName);
};

function Policeman() {
  Person.call(this);
  this.badgenumber = '124';
}

// Policeman.prototype = new Person();
util.inherits(Policeman, Person);
var policeman = new Policeman();
policeman.greet();
