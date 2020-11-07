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

//COLLECTION NAMES user and tournament
//query to insert tournament info into tournament collection
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


//UPDATES TOURNAMENT REGISTERED AND WINNER KEY TO USER ID
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

//UPDATE USERS ATTENDED
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


//FIND TOURNAMENT BY ID
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

//FIND USER BY NAME
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

const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.collection('user', (err, collection) => {
      if (err) {
        reject(err);
      } else {
        collection.findOne({ "userId": id }, (error, result) => {
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

const updateWinner = async (tournamentId, username, winnings) => {
  let tournament = await findTournament(tournamentId);
  let userCollection = db.collection('user');
  let count = 0;
  // return new Promise((resolve, reject) => {
  const wait = async () => {
    return Promise.all(tournament.registered.map((x) => {
      return findUserById(x)
        .then((userDocument) => {
          count++;
          //first place gets a win and money added to earnings
          if (userDocument.name === username) {
            // console.log(userDocument.name, username, winnings[userDocument.name], 'this is the matching usernames');
            let userWinnings = 0;
            let winner = userDocument.wins += 1;
            if (winnings[userDocument.name]) {
              userWinnings = userDocument.winnings += winnings[userDocument.name]
            } else {
              userWinnings = userDocument.winnings;
            }
            return { winnings: userWinnings, wins: winner, username: userDocument.name, type: "wins" };;
            //everyone in the tournament gets a loss and no momney
          } else {
            let userLosses = userDocument.losses += 1;
            let userWinnings = 0;
            if (winnings[userDocument.name]) {
              userWinnings = userDocument.winnings += winnings[userDocument.name];
            } else {
              userWinnings = userDocument.winnings;
            }

            return { winnings: userWinnings, losses: userLosses, username: userDocument.name, type: "losses" };
          }
        })
    }))
  }
  let info = await wait();
  let counter = 0;
  // console.log(info[0]);
  return new Promise((resolve, reject) => {
    info.map((userInfo) => {
      let insert = {};
      counter++;
      insert[userInfo.type] = userInfo.losses || userInfo.wins;
      insert["winnings"] = userInfo.winnings;
      console.log(insert);
      userCollection.updateOne({ "name": userInfo.username }, { $set: insert }, (errors, res) => {
        if (errors) {
          reject(errors)
        } else if (counter === info.length) {
          console.log(counter, info.length, 'THIS IS LENGTH');
          resolve(res)
        }
      })
    })
  })
};



module.exports = {
  insertTournamentInfo,
  updateUserInfo,
  updateTournament,
  findTournament,
  findUserByName,
  findUserById,
  updateWinner
}

