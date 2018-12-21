const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (err, client) => {
    if (err) {
      return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');
    const db = client.db('Todos');
    // db.collection('Todos')
    //   .find()
    // db.collection('Todos')
    //   .find({ completed: false })
    db.collection('Todos')
      .find({ _id: new ObjectID('5c10ea9a421f384e93e14101') })
      .toArray()
      .then(
        (docs) => {
          console.log('Todos');
          console.log(JSON.stringify(docs, undefined, 2));
        },
        (err) => console.log('Unable to fetch todos', err)
      );
    db.collection('Todos')
      .find()
      .count()
      .then(
        (count) => {
          console.log(`Todos count: ${count}`);
        },
        (err) => console.log('Unable to fetch todos count', err)
      );
    client.close();
  }
);
