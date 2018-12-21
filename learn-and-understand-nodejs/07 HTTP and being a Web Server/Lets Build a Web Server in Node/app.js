var http = require('http');

// Function passed to createServer tunrs out to be a event listener
// When server object emits 'request' event with req, res parameter
http
  .createServer(function(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('Hello World\n');
  })
  .listen(5000, '127.0.0.1');
// Where does node map to the port
