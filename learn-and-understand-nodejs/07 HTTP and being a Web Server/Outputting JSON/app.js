var http = require('http');
http
  .createServer(function(req, res) {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    var obj = {
      firstname: 'John',
      lastname: 'Doe'
    };
    res.end(JSON.stringify(obj));
  })
  .listen(5000, '127.0.0.1');
