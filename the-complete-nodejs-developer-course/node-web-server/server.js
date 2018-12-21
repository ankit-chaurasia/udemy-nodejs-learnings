const express = require('express');
const app = express();

app.get('/', (req, res) => {
  // res.send('hello express');
  // res.send('<h1>Hello Express</h1>');
  res.send({
    name: 'John',
    likes: ['Biking', 'Cities']
  });
});

app.get('/about', (req, res) => res.send('About Page'));

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error occurred'
  });
});

app.listen(5000);
