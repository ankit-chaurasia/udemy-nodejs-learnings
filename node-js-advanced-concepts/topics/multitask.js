process.env.UV_THREADPOOL_SIZE = 5;
const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();
function doRequest() {
  // Uses libuv then libuv delegates to OS so it is an OS operation
  https
    .request('https://www.google.com', (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log('HTTP:', Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  // Uses libuv with threadpool
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('Hash:', Date.now() - start);
  });
}
doRequest();

// Uses libuv with threadpool
fs.readFile('./multitask.js', 'utf-8', (err, data) => {
  console.log('FS:', Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();
