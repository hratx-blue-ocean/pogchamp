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
const getNewTournamentId = () => {
  const utils = db.collection('utility').find({}, (cursor) => {
    return cursor.toArray()[0].tournamentId;
  });
  // let current = utils[0].tournamentId;
  // db.collection('utility').updateOne({}, {$inc: {tournamentId: 1}});
  // return current;
}

// get new user id
const getNewUserId = () => {
  let utils = db.collection('utility').find({})[0];
  let current = utils.userId;
  db.collection('utility').updateOne({}, {$inc: {userId: 1}});
  return current;
}

// create new tournament
const createNewTournament = (name, hostName, date, location, city, type, playerLimit, rounds, totalPrize, callback) => {
  let id = getNewTournamentId();
  db.collection('tournaments').insertOne({name: name, tournamentId: id, hostName: hostName, date: date, location: location, city: city, type: type, playerLimit: playerLimit, rounds: rounds, totalPrize: totalPrize});
}

console.log(getNewTournamentId());