const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

const id = '5c13405e715cb796f3ea24a5';
const userId = '5c12219cca4ec32501227d46';

// if (!ObjectID.isValid(id)) {
//   console.log('Id not valid');
// }

// // get all todos
// Todo.find({
//   _id: id
// }).then((todos) => console.log(JSON.stringify(todos, undefined, 2)));

// // Get first matched item
// Todo.findOne({
//   _id: id
// }).then((todo) => console.log(JSON.stringify(todo, undefined, 2)));

// // Get item by id
// Todo.findById(id)
//   .then((todo) => {
//     if (!todo) console.log('Id not found');
//     console.log(JSON.stringify(todo, undefined, 2));
//   })
//   .catch((err) => console.log(err));

// // Note: If item does not exist in DB, it will not throw any error but gives you empty array, null etc so you should handle no data scenario in success callback
// // If you provide invalid id you will get error that you should handle in failure callback

User.findById(userId)
  .then((users) => {
    if (!users) {
      console.log('User nor found');
    }
    console.log(JSON.stringify(users, undefined, 2));
  })
  .catch((err) => console.log(err));
