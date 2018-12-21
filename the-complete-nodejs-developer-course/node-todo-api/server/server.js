require('./config/config');
const _ = require('lodash');
const express = require('express');
const app = express();
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const { authenticate } = require('./middleware/authenticate');

const port = process.env.PORT || 5000;

const jsonParser = express.json();

app.use(jsonParser);

app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then((doc) => res.send(doc), (err) => res.status(400).send(err));
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({ _creator: req.user._id })
    .then((todos) => {
      if (!todos) {
        return res.status(200).send({ todos: null });
      }
      res.status(200).send({ todos });
    })
    .catch((err) => res.status(400).send(err));
});

app.get('/todos/:id', authenticate, (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) return res.status(404).send();
  Todo.findOne({
    _id: id,
    _creator: req.user.id
  })
    .then((todo) => {
      if (!todo) return res.status(404).send(null);
      res.status(200).send({ todo });
    })
    .catch((err) => res.status(400).send(err));
});

app.delete('/todos/:id', authenticate, (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) return res.status(404).send();
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user.id
  })
    .then((todo) => {
      if (!todo) return res.status(404).send();
      res.status(200).send({ todo });
    })
    .catch((err) => res.status(400).send(err));
});

app.patch('/todos/:id', authenticate, (req, res) => {
  const { id: _id } = req.params;
  const body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectID.isValid(_id)) return res.status(404).send();

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate(
    { _id, _creator: req.user.id },
    {
      $set: body
    },
    { new: true }
  )
    .then((todo) => {
      if (!todo) return res.status(404).send();
      res.status(200).send({ todo });
    })
    .catch((err) => res.status(400).send());
});

app.post('/users', async (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({ email, password });
  try {
    const user = await newUser.save();
    const token = await user.generateAuthToken();
    return res
      .header('x-auth', token)
      .status(200)
      .send({ user });
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res
      .header('x-auth', token)
      .status(200)
      .send({ user });
  } catch (err) {
    res.status(400).send();
  }
});

app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (err) {
    res.status(400).send();
  }
});

app.get('/users/me', authenticate, (req, res) => {
  res.send({ user: req.user });
});

app.listen(port, () => console.log(`Server started at port ${port}`));

module.exports.app = app;
