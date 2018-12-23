const cluster = require('cluster');
// first run, is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed again but in child mode
  // Set master mode to false
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  // I am a child, I am going to act like a server and do nothing else
  const express = require('express');
  const app = express();

  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get('/', (req, res) => {
    doWork(5000); // This code is getting processed in event loop and event loop can't do anything while this is running
    res.send('Hi There');
  });

  app.listen(3000);
}
