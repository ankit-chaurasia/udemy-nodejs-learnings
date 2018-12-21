var util = require('util');
var name = 'John';
var greeting = util.format('Hello, %s', name);
util.log(greeting);
