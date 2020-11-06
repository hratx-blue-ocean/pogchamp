const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
import {saltNhash, compareHashes} from '../server/security/index.js'

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

// get new user id
const getNewUserId = (callback) => {
  db.collection('utility').find({}).toArray((err, result) => {
    if (err) {
      console.log(err)
    } else {
      callback(result[0].userId);
    }
  });
}

// increment (for use after get)
const incrementTournamentId = (callback) => {
  db.collection('utility').updateOne({}, {$inc: {tournamentId: 1}})
  .then((res) => {callback(res.result);})
  .catch((err) => {callback(err);});
}

// increment (for use after get)
const incrementUserId = (callback) => {
  db.collection('utility').updateOne({}, {$inc: {userId: 1}})
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

// create new user
const createNewUser = (name, password, type) => {
  getNewUserId((res) => {
    let passNhash = saltNhash(password);
    if (type === 'organizer') {
    db.collection('users').insertOne({name: name, password: passNhash, userId: res, hosted: []})
    .then((res) => {
      incrementUserId(callback);
    })
    .catch((err) => {
      callback(err);
    })
    } else if (type === 'player') {
    db.collection('users').insertOne({name: name, password: passNhash, attended: [], wins: 0, losses: 0, winnings: 0})
    .then((res) => {
      incrementUserId(callback);
    })
    .catch((err) => {
      callback(err);
    })
    }
  });
}

// distribute winnings
const issueWinnings = (name, purse, callback) => {
  db.collection('users').updateOne({name: name}, {$inc: {winnings: purse}})
  .then((res) => {callback(res.result);})
  .catch((err) => {callback(err);});
}


// TODO: queries to update tournaments (check with LC about what specifically we want to update), queries to update user W/L (is this by points, by match, or by tournament?)