const app = require('./app');

jest.mock('./db');
const db = require('./db');
db.saveUser.mockImplementation = jest.fn();

describe('App', () => {
  describe('#handleSignup', () => {
    const email = 'test@test';
    const password = 'password';
    const data = { email, password };
    app.handleSignup(email, password);
    it('should call saveUser method', () => {
      expect(db.saveUser).toBeCalledWith(data);
    });
  });
});
