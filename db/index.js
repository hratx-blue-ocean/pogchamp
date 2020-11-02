const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

// connection url -- TODO: update with deployed url
const url = 'mongodb://localhost:27017';

// database name
const dbName = 'pogchamp';

// create a new client
const client = new MongoClient(url);

client.connect(function(err) {
  assert.strictEqual(null, err);
  console.log("Connected successfully to server");
});

// create reference to database
const db = client.db(dbName);

