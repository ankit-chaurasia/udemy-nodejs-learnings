var fs = require('fs');
var zlib = require('zlib');
var readable = fs.createReadStream(`${__dirname}/greet.txt`, {
  encoding: 'utf8',
  highWaterMark: 32 * 1024 // size of buffer in bytes
});

var writable = fs.createWriteStream(`${__dirname}/greetcopy.txt`);
var compressed = fs.createWriteStream(`${__dirname}/greet.txt.gz`);

// creates tranform stream
var gzip = zlib.createGzip();
// readable.on('data', function(chunk) {
//   console.log(chunk.length);
//   writable.write(chunk);
// });
readable.pipe(writable);
readable.pipe(gzip).pipe(compressed);
