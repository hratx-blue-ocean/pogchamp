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
  db.collection('utility').insertOne({userId: 1, tournamentId: 1})
  .then((res) => {
    createNewUser('leSLAY', 'insecurepassword', 'player', () => {
    createNewUser('rapwnzel', 'insecurepassword', 'player', () => {
      createNewUser('grantalf', 'insecurepassword', 'player', () => {
        createNewUser('DannyPhantom', 'insecurepassword', 'player', () => {
          createNewUser('DannyPhantom', 'insecurepassword', 'player', () => {
            createNewUser('banjo1224', 'insecurepassword', 'player', () => {
              createNewUser('emmanuelMiranda', 'insecurepassword', 'player', () => {
                createNewUser('BrockLesnar', 'insecurepassword', 'player', () => {
                  createNewUser('emi1337', 'insecurepassword', 'player', logger);
                });
              });
            });
          });
        });
      });
    });
  });
  })
  .catch((err) => {console.log(err)});
};

seeder();