function Greet() {
  this.greeting = 'greet4';
  this.greet = function() {
    console.log(this.greeting);
  };
}

module.exports = Greet;
