const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (err, client) => {
    if (err) {
      return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');
    // const db = client.db('Todos');
    // db.collection('Todos').insertOne(
    //   {
    //     text: 'Something to do',
    //     completed: false
    //   },
    //   (err, result) => {
    //     if (err) {
    //       return console.log('Unable to  insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(`document ID: ${result.ops[0]._id}`);
    //     console.log(`document Timestamp: ${result.ops[0]._id.getTimestamp()}`);
    //   }
    // );
    // db.collection('Users').insertOne(
    //   { name: 'John', age: 22, location: '555 street' },
    //   (err, result) => {
    //     if (err) {
    //       return console.log('Unable to  insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //   }
    // );
    client.close();
  }
);
