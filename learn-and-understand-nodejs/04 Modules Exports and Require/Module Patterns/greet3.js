function Greet() {
  this.greeting = 'greet3';
  this.greet = function() {
    console.log(this.greeting);
  };
}

module.exports = new Greet();
