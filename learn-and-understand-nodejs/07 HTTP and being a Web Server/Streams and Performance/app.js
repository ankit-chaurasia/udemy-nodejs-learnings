var http = require('http');
var fs = require('fs');

http
  .createServer(function(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    // var html = fs.readFileSync(`${__dirname}/index.html`, 'utf8');
    // html = html.replace('{Message}', 'Hello World!!');
    // res.end(html);
    fs.createReadStream(`${__dirname}/index.html`, 'utf8').pipe(res);
  })
  .listen(5000, '127.0.0.1');
