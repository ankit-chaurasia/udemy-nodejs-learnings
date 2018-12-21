const db = require('./db');

module.exports.handleSignup = (email, password) => {
  // Check if email already exist
  // Save the user in the database
  db.saveUser({ email, password });
  // Send the welcome mail
};
