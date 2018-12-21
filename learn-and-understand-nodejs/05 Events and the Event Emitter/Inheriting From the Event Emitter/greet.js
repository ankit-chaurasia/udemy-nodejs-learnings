var EventEmitter = require('events');

class Greet extends EventEmitter {
  constructor() {
    super();
    this.greeting = 'Hello';
  }

  greet(data) {
    console.log(`${this.greeting} :${data}`);
    this.emit('greet', data);
  }
}

module.exports = Greet;
