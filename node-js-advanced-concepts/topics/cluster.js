process.env.UV_THREADPOOL_SIZE = 2;
const cluster = require('cluster');
const crypto = require('crypto');
// first run, is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed again but in child mode
  // Set master mode to false
  cluster.fork();
  cluster.fork();
} else {
  // I am a child, I am going to act like a server and do nothing else
  const express = require('express');
  const app = express();

  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      console.log('1:', Date.now() - start);
      res.send('Hi There');
    });
  });

  app.get('/fast', (req, res) => res.send('This is fast'));

  app.listen(3000);
}
