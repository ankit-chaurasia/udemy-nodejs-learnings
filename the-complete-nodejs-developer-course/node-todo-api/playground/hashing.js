const { SHA256 } = require('crypto-js');
const { sign, verify } = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const password = 'asd1231';
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log('Hash:', hash);
  });
});

const hashedPassword =
  '$2a$10$dHu1kok5qjEyHrn5MKjY5OC8mHkt12lcXFl985QvPELWFymJPybhe';
bcrypt.compare(password, hashedPassword, (err, result) => {
  console.log(result);
});

// const secretKey = 'secretkey';
// const data = {
//   id: 10
// };

// const token = sign(data, secretKey); // Send back to the user while sign up or login
// console.log(token);

// const decoded = verify(token, secretKey);
// console.log('Decoded:', decoded);

// jwt.sign
// takes data and signs it then returns token value
// jwt.verify
// it takes token and secret and makes sure data was not manipulative

// const message = 'I am user number 3';
// const hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// const data = {
//   id: 4
// };

// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
// const resulthash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resulthash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log("Data was changed. Don't trust");
// }
