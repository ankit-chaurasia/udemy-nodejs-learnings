const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisURL = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisURL);
client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');

  return this;
};

mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );
  // See if we have a value for 'key' in redis
  const cacheValue = await client.hget(this.hashKey, key);
  // if yes, return that
  if (cacheValue) {
    // exec function expects us to return mongoose documents
    // or what we referred to also as model
    // each JSON object should be a model instance
    // convert array of JSON into model instance
    const docs = JSON.parse(cacheValue);
    return Array.isArray(docs)
      ? docs.map((doc) => new this.model(doc))
      : new this.model(docs);
  }
  // else issue the query and store the result in redis
  const result = await exec.apply(this, arguments);
  client.hset(this.hashKey, key, JSON.stringify(result));
  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
};
