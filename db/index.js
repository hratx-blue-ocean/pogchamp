const { call } = require('file-loader');

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

const db = client.db(dbName);

// COLLECTION NAMES user and tournament
// query to insert tournament info into tournament collection
const insertTournamentInfo = (obj) => {
  console.log(obj, "object to be inserted");
  return new Promise((resolve, reject) => {
    db.collection('tournament').insertOne(obj, (error, result) => {
      if (error) {
        console.log("error inserting", err);
        reject(error);
      } else {
        resolve(result);
      }
    })
  })
};


// UPDATES TOURNAMENT REGISTERED AND WINNER KEY TO USER ID
const updateTournament = (id, array) => {
  console.log(array);
  return new Promise((resolve, reject) => {
    let tournamentCollection = db.collection('tournament');
    tournamentCollection.updateOne({ "tournamentId": id }, { $set: { "registered": array } }, (error, res) => {
      if (error) {
        reject(error);
      } else {
        resolve(res);
      }
    })
  })
};

// UPDATE USERS ATTENDED
const updateUserInfo = (username, tournamentId) => {
  return new Promise((resolve, reject) => {
    let userCollection = db.collection('user');
    findUserByName(username)
      .then((data) => {
        if (data !== null) {
          userCollection.updateOne({ "name": username }, { $set: { "attended": [...data.attended, tournamentId] } }, (error, res) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          })
        } else {
          resolve(data);
        }
      })
      .catch((err) => {
        reject(err);
      })
  })
};


// FIND TOURNAMENT BY ID
const findTournament = (id) => {
  return new Promise((resolve, reject) => {
    db.collection('tournament', (err, collection) => {
      if (err) {
        reject(err);
      } else {
        collection.findOne({ "tournamentId": id }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
      }
    })
  })
};

// FIND USER BY NAME
const findUserByName = (str) => {
  return new Promise((resolve, reject) => {
    db.collection('user', (err, collection) => {
      if (err) {
        reject(err);
      } else {
        collection.findOne({ "name": str }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
      }
    })
  })
};


//query to insert guest to own collection
// const insertGuestInfo = (obj) => {
//   console.log(obj);
//   return new Promise ((resolve, reject) => {
//     db.collection('guest', (err, collection) => {
//       if (err) {
//         reject(err);
//       } else {
//         collection.insertOne(obj, (error, result) => {
//           if (error) {
//             reject(error)
//           } else {
//             resolve(result)
//           }
//         })
//       }
//     })
//   })
// };



// Query for userDashboard for both Player and Organizer
const getUserData = (username, callback) => {
  console.log(username,  "username receieved")
  db.collection('users').findOne({name: username}, (err, res)=> {
    if (err) {
      console.log("error:", err);
      callback(err, null);
    } else {
      console.log("query result", res)
      callback(null, res);
    }
  })
}

module.exports = {
  insertTournamentInfo,
  updateUserInfo,
  updateTournament,
  findTournament,
  findUserByName,
  getUserData,
}

