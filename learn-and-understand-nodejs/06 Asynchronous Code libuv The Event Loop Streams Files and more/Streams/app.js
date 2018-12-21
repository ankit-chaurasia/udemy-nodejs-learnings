var fs = require('fs');
var readable = fs.createReadStream(`${__dirname}/greet.txt`, {
  encoding: 'utf8',
  highWaterMark: 32 * 1024 // size of buffer in bytes
});

var writable = fs.createWriteStream(`${__dirname}/greet.txt`);

// The stream will fill a buffer so will begin to read this file and it will
// fill up the buffer with contents. If the file content is less than the buffer size
// then you will get all data at once, else you will get pieces of data each time. Each piece is the size of buffer
// read the file, fill the buffer, emit data event and run the listener. Keep doing this for rest of the file
// until it finish the file.

readable.on('data', function(chunk) {
  console.log(chunk.length);
  writable.write(chunk);
});
