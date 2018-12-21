var fs = require('fs');
var greet = fs.readFileSync(`${__dirname}/greet.txt`, 'utf8');
console.log(greet);

fs.readFile(`${__dirname}/greet.txt`, function(err, data) {
  if (err) {
    console.log(err);
    return;
  }
  // By default it will print buffer read from the file
  console.log(data); // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64 21 21>
  // print characters
  console.log(data.toString()); //hello world!!
});

fs.readFile(`${__dirname}/greet.txt`, 'utf8', function(err, data) {
  if (err) {
    console.log(err);
    return;
  }
  // Already set character encoding to utf8 in params
  console.log(data); // hello world!!
});
