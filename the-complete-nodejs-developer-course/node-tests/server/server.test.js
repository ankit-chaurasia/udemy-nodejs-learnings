const request = require('supertest');
const app = require('./server').app;

describe('Server', () => {
  describe('GET /', () => {
    it('should return hello world response', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect('Hello world!')
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('GET /users', () => {
    it('should return my user obejct', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(
            expect.arrayContaining([{ name: 'Mike', age: 27 }])
          );
        })
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
});
