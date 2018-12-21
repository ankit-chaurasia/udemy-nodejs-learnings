var Greet = require('./greet');
var greet = new Greet();

greet.on('greet', function(data) {
  console.log(`Someone greeting: ${data}`);
});

greet.greet('Tony');
