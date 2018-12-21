exports.greet = function() {
  console.log('Hello');
};

console.log(exports); // { greet: [Function] }
console.log(module.exports); // { greet: [Function] }
