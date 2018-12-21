const utils = require('./utils');

describe('Utils', () => {
  describe('#add', () => {
    it('should add two numbers', () => {
      expect(utils.add(2, 3)).toBe(5);
      expect(3.14).toBeLessThan(4);
    });
  });

  it('should async add two numbers', (done) => {
    utils.asyncAdd(4, 3, (sum) => {
      expect(sum).toBe(7);
      done();
    });
  });

  it('should verify first and last name', () => {
    const user = {
      age: 25
    };
    const res = utils.setName(user, 'John Doe');
    expect(res).toEqual({
      age: 25,
      firstName: 'John',
      lastName: 'Doe'
    });
  });
});

it('should expect some values', () => {
  expect(12).toBe(12);
  expect(12).not.toBe(20);
  expect({ name: 'John' }).toEqual({ name: 'John' });
  expect({ name: 'John' }).not.toEqual({ name: 'john' });
});
