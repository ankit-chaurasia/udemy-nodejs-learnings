var greeting = 'greet5';
// greeting variable is protected in the module because it is not exported by the module

function greet() {
  console.log(greeting);
}

module.exports = {
  greet
};
