const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/users', (req, res) => {
  res.send([
    { name: 'Mike', age: 27 },
    { name: 'John', age: 25 },
    { name: 'Jane', age: 23 }
  ]);
});

app.listen(5000);

module.exports.app = app;
