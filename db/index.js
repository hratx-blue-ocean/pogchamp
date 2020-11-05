const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

// connection url -- TODO: update with deployed url
const url = 'mongodb://localhost:27017';

// database name
const dbName = 'pogchamp';

// create a new client
const client = new MongoClient(url, { useUnifiedTopology: true });

// create a connection
client.connect((err, result) => {
  assert.strictEqual(null, err);
  console.log("Connected successfully to server");
});

// reference the db
const db = client.db(dbName);

/*
                             ,--.
 ,---. ,--.,--. ,---. ,--.--.`--' ,---.  ,---.
| .-. ||  ||  || .-. :|  .--',--.| .-. :(  .-'
' '-' |'  ''  '\   --.|  |   |  |\   --..-'  `)
 `-|  | `----'  `----'`--'   `--' `----'`----'
   `--'
*/

// help none of this works


// get new tournament id
const getNewTournamentId = (callback) => {
  db.collection('utility').find({}).toArray((err, result) => {
    if (err) {
      console.log(err)
    } else {
      callback(result[0].tournamentId);
    }
  });
}

const incrementTournamentId = (callback) => {
  db.collection('utility').updateOne({}, {$inc: {tournamentId: 1}})
  .then((res) => {callback(res.result);})
  .catch((err) => {callback(err);});
}

// create new tournament
const createNewTournament = (name, hostName, date, location, vity, type, playerLimit, rounds, totalPrize, callback) => {
  getNewTournamentId((res) => {
    let datea = new Date (date);
    db.collection('tournaments').insertOne({name: name, tournamentId: res, hostName: hostName, date: datea, location: location, city: city, type: type, playerLimit: playerLimit, rounds: rounds, registered: [], pairings: [], scores: {}, totalPrize: totalPrize})
    .then((res) => {
      incrementTournamentId(callback);
    })
    .catch((err) => {
      callback(err);
    })
  });
}

