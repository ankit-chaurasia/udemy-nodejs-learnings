const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (err, client) => {
    if (err) {
      return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');
    const db = client.db('Todos');
    // deleteMany
    // db.collection('Todos')
    //   .deleteMany({ text: 'eat lunch' })
    //   .then((result) => console.log(result));

    // deleteOne
    // db.collection('Todos')
    //   .deleteOne({ text: 'eat lunch' })
    //   .then((result) => console.log(result));

    // findOneAndDelete
    db.collection('Todos')
      .findOneAndDelete({
        _id: new ObjectID('5c10ea9a421f384e93e14101')
      })
      .then((result) => console.log(result));
    client.close();
  }
);
