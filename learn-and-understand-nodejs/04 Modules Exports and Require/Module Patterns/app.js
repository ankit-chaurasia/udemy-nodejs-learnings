var greet1 = require('./greet1');
greet1();

var greet2 = require('./greet2');
greet2.greet();

var greet2_1 = require('./greet2').greet;
greet2_1();

var greet3 = require('./greet3');
greet3.greet();
greet3.greeting = 'changed greet3';

// When you require the same module again, it will be the same object as you got above
// require store the module in the cache, so next time if you invoke you will get it from cache(object having the same reference)
// No matter how many times you require the module across the application, it will call module.exports only once and returns same reference from cache for the further call
var greet3_again = require('./greet3');
greet3_again.greet();
greet3.greet();

var Greet4 = require('./greet4');
var greet4 = new Greet4();
greet4.greet();

// Revealing Module patterm: Exposing only the properties and method you want via an returned object
var greet5 = require('./greet5');
greet5.greet();
