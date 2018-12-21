const { ObjectID } = require('mongodb');
const { sign, verify } = require('jsonwebtoken');
const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
  {
    _id: userOneId,
    email: 'user@one.com',
    password: 'userOnePass',
    tokens: [
      {
        access: 'auth',
        token: sign(
          { _id: userOneId, access: 'auth' },
          process.env.JWT_SECRET
        ).toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: 'user@two.com',
    password: 'userTwoPass',
    tokens: [
      {
        access: 'auth',
        token: sign(
          { _id: userTwoId, access: 'auth' },
          process.env.JWT_SECRET
        ).toString()
      }
    ]
  }
];

const todos = [
  {
    _id: new ObjectID(),
    text: 'item 1',
    _creator: userOneId
  },
  {
    _id: new ObjectID(),
    text: 'item 2',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
  }
];

const populateTodos = (done) =>
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());

const populateUsers = (done) => {
  User.remove({})
    .then(() => {
      const userOne = new User(users[0]).save();
      const userTwo = new User(users[1]).save();
      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};
module.exports = { todos, populateTodos, users, populateUsers };
