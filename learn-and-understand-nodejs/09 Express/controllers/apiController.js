module.exports = function(app) {
  app.get('/api/person', function(req, res) {
    // get all person from db
  });

  app.get('/api/person/:id', function(req, res) {
    // get that person from db
  });

  app.post('/api/person', function(req, res) {
    // save that person in db
  });

  app.delete('/api/person/:id', function(req, res) {
    // delete that person from db
  });
};
