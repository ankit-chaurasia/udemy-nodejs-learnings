const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (err, client) => {
    if (err) {
      return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');
    const db = client.db('Todos');

    db.collection('Todos')
      .findOneAndUpdate(
        {
          _id: new ObjectID('5c110881eef1a34cba998618')
        },
        {
          $set: {
            completed: true
          }
        },
        {
          returnOriginal: false
        }
      )
      .then((result) => console.log(result));

    client.close();
  }
);
