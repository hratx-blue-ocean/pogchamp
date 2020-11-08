const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017';

const dbName = 'pogchamp';

const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect((err, result) => {
  assert.strictEqual(null, err);
  console.log("i liiiiiiiiive");
});

const db = client.db(dbName);

const {createNewUser} = require('./index.js');

const logger = (name) => {
  console.log('Here comes a new challenger!');
}

const seeder = () => {
  db.collection('utility').insertOne({userId: 1, tournamentId: 1});
  createNewUser('leSLAY', 'insecurepassword', 'player', logger);
  createNewUser('rapwnzel', 'insecurepassword', 'player', logger);
  createNewUser('grantalf', 'insecurepassword', 'player', logger);
  createNewUser('DannyPhantom', 'insecurepassword', 'player', logger);
  createNewUser('banjo1224', 'insecurepassword', 'player', logger);
  createNewUser('emmanuelMiranda', 'insecurepassword', 'player', logger);
  createNewUser('BrockLesnar', 'insecurepassword', 'player', logger);
  createNewUser('emi1337', 'insecurepassword', 'player', logger);
};

seeder();