const request = require('supertest');
const { ObjectID } = require('mongodb');
const { app } = require('../server');
const { Todo } = require('../models/todo');
const { User } = require('../models/user');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

describe('server.js', () => {
  beforeEach(populateUsers);
  beforeEach(populateTodos);

  describe('POST /todos', () => {
    it('should create a new todo', (done) => {
      const text = 'todo text';
      request(app)
        .post('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .send({
          text
        })
        .expect(200)
        .expect((res) => expect(res.body.text).toBe(text))
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Todo.find({ text })
            .then((todos) => {
              expect(todos.length).toBe(1);
              expect(todos[0].text).toBe(text);
              done();
            })
            .catch((err) => done(err));
        });
    });

    it('should not create todo with invalid body data', (done) => {
      const text = '';
      request(app)
        .post('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .send({ text })
        .expect(400)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          Todo.find()
            .then((todos) => {
              expect(todos.length).toBe(2);
              done();
            })
            .catch((err) => done(err));
        });
    });
  });

  describe('GET /todos', () => {
    it('should get all todos', (done) => {
      request(app)
        .get('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => expect(res.body.todos.length).toBe(1))
        .end(done);
    });
  });

  describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should not return todo doc created by other user', (done) => {
      request(app)
        .get(`/todos/${todos[1]._id.toHexString()}`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(404)
        .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
      const hexId = new ObjectID().toHexString();
      request(app)
        .get(`/todos/${hexId}`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non object id', (done) => {
      request(app)
        .get('/todos/1234')
        .set('x-auth', users[0].tokens[0].token)
        .expect(404)
        .end(done);
    });
  });

  describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
      const hexId = todos[1]._id.toHexString();
      request(app)
        .delete(`/todos/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Todo.findById(hexId)
            .then((todo) => {
              expect(todo).toBeNull();
              done();
            })
            .catch((err) => done(err));
        });
    });

    it('should not remove a todo', (done) => {
      const hexId = todos[0]._id.toHexString();
      request(app)
        .delete(`/todos/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Todo.findById(hexId)
            .then((todo) => {
              expect(todo).not.toBeNull();
              done();
            })
            .catch((err) => done(err));
        });
    });

    it('should return a 404 if todo not found', (done) => {
      const hexId = new ObjectID().toHexString();
      request(app)
        .delete(`/todos/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non object id', (done) => {
      request(app)
        .delete('/todos/1234')
        .set('x-auth', users[1].tokens[0].token)
        .expect(404)
        .end(done);
    });
  });

  describe('PATCH /todos/:id', () => {
    it('should update a todo', (done) => {
      const hexId = todos[0]._id.toHexString();
      const body = {
        text: 'updated item',
        completed: true
      };
      request(app)
        .patch(`/todos/${hexId}`)
        .set('x-auth', users[0].tokens[0].token)
        .send(body)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo._id).toBe(hexId);
          expect(res.body.todo.text).toBe(body.text);
          expect(res.body.todo.completed).toBe(body.completed);
          expect(res.body.todo.completedAt).not.toBeNull();
        })
        .end(done);
    });

    it('should not update a todo', (done) => {
      const hexId = todos[0]._id.toHexString();
      const body = {
        text: 'updated item',
        completed: true
      };
      request(app)
        .patch(`/todos/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .send(body)
        .expect(404)
        .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
      const hexId = todos[1]._id.toHexString();
      const body = {
        text: 'new text!!'
      };
      request(app)
        .patch(`/todos/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .send(body)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo._id).toBe(hexId);
          expect(res.body.todo.text).toBe(body.text);
          expect(res.body.todo.completed).toBe(false);
          expect(res.body.todo.completedAt).toBeNull();
        })
        .end(done);
    });
  });

  describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
      request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
          expect(res.body.user._id).toBe(users[0]._id.toHexString());
          expect(res.body.user.email).toBe(users[0].email);
        })
        .end(done);
    });

    it('should return 401 if not authenticated', (done) => {
      request(app)
        .get('/users/me')
        .expect(401)
        .end(done);
    });
  });

  describe('POST /users', () => {
    it('should create a user', (done) => {
      const email = 'example@example.com';
      const password = 'password';
      request(app)
        .post('/users')
        .send({ email, password })
        .expect(200)
        .expect((res) => {
          expect(res.header['x-auth']).not.toBeNull();
          expect(res.body.user._id).not.toBeNull();
          expect(res.body.user.email).toBe(email);
        })
        .end((err) => {
          if (err) return done(err);
          User.findOne({ email })
            .then((user) => {
              expect(user).not.toBeNull();
              expect(user.password).not.toBe(password);
            })
            .catch((err) => done(err));
          done();
        });
    });

    it('should return validation errors if request is invalid', (done) => {
      const email = 'invalidEmail';
      const password = 'ipass';
      request(app)
        .post('/users')
        .send({ email, password })
        .expect(400)
        .end(done);
    });

    it('should not create user if email already in user', (done) => {
      request(app)
        .post('/users')
        .send({ email: users[0].email, password: 'pass@123' })
        .expect(400)
        .end(done);
    });
  });

  describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
      request(app)
        .post('/users/login')
        .send({ email: users[1].email, password: users[1].password })
        .expect(200)
        .expect((res) => {
          expect(res.headers['x-auth']).not.toBeNull();
        })
        .end((err, res) => {
          if (err) return done(err);
          User.findById(users[1]._id)
            .then((user) => {
              expect(user.tokens[1]).toMatchObject({
                access: 'auth',
                token: res.headers['x-auth']
              });
              done();
            })
            .catch((err) => done(err));
        });
    });

    it('should reject invalid login', (done) => {
      request(app)
        .post('/users/login')
        .send({ email: users[1].email, password: '123456' })
        .expect(400)
        .expect((res) => {
          expect(res.headers['x-auth']).toBeUndefined();
        })
        .end((err, res) => {
          if (err) return done(err);
          User.findById(users[1]._id)
            .then((user) => {
              expect(user.tokens.length).toBe(1);
              done();
            })
            .catch((err) => done(err));
        });
    });
  });

  describe('DELETE /users/me/token', () => {
    it('should remove auth token on logout', (done) => {
      request(app)
        .delete('/users/me/token')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          User.findById(users[0]._id)
            .then((user) => {
              expect(user.tokens.length).toBe(0);
              done();
            })
            .catch((err) => done(err));
        });
    });
  });
});