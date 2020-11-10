const express = require('express');
const router = express.Router();
const axios = require('axios');
const baseUrl = 'https://api.challonge.com/v1/tournaments';
const { api_key } = require('./config.js');
const { insertTournamentInfo, updateUserInfo, updateTournament, findTournament, findUserByName, findUserById, updateWinner, topFiveEarners, topFiveWinners, topFiveRatio, updateTournamentStatus, findTournamentByStatus, findTournamentByHostName } = require('../../db/index.js');
// console.log('api key:', api_key);


router.post('/postParticipant', (req, res) => {
  console.log('posting new participants');
  let body = req.body;
  let results = null;
  let tournamentId = body.tournamentId;
  let participants = { "participants": body.participants };

  axios.post(`${baseUrl}/${tournamentId}/participants/bulk_add.json?api_key=${api_key}`, participants)
    .then((result) => {
      results = result.data;
      console.log(results, "THIS IS THE RESULTS")
      // console.log(result, "posted participants");
      res.send(result.data)
    })
    .then(() => {
      let arr = [];
      let count = 0;
      results.map((username, i) => {
        new Promise((resolve, reject) => {
          updateUserInfo(username.participant.name, tournamentId, username.participant.id)
            .then((data) => {
              resolve(data)
            })
            .catch((err) => {
              reject(err);
            })
        })
          .then((result) => {
            count++;
            if (count === results.length) {
              if (result !== null) {
                arr.push(result.userId);
              }
              updateTournament(tournamentId, arr)
                .then((result2) => {
                  console.log(result2);
                })
                .catch((err) => {
                  console.log(err);
                })
            } else if (result !== null && count !== results.length) {
              arr.push(result.userId)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      })
    })
    .catch((err) => {
      console.log("Error posting participants:", err);
    })
})

router.post('/postOneParticipant', (req, res) => {
  let body = req.body;
  let results = null;
  let arr = [];
  let tournamentId = body.tournamentId;
  let name = { name: body.participants[0].name, description: "something" }
  axios.post(`${baseUrl}/${tournamentId}/participants.json?api_key=${api_key}`, name)
    .then((result) => {
      results = result.data;
      res.send(results)
    })
    .then(() => {
      new Promise((resolve, reject) => {
        updateUserInfo(results.participant.name, tournamentId, results.participant.id)
          .then((data) => {
            console.log(data, "YAY");
            resolve(data)
          })
          .catch((err) => {
            reject(err);
          })
      })
        .then((result) => {
          if (result !== null) {
            arr.push(result.userId);
            updateTournament(tournamentId, arr)
              .then((result2) => {
                console.log(result2);
              })
              .catch((err) => {
                console.log(err);
              })
          }
        })
    })
    .catch((err) => {
      console.log("Error posting participants:", err);
    })
})

router.post('/createTournament', (req, res) => {
  let body = req.body.data;
  let obj = { "name": body.name, "description": body.description };
  // console.log(obj, 'THIS IS THE OBJJJJJJJ');
  let tournamentId = null;
  let Url = null;
  axios.post(`${baseUrl}.json?api_key=${api_key}`, obj)
    .then((result) => {
      tournamentId = result.data.tournament.id;
      Url = result.data.tournament.url;
      res.send(result.data);
    })
    .then(() => {
      req.body.form.name = body.name;
      req.body.form.tournamentId = tournamentId;
      req.body.form.Url = Url;
      req.body.form.status = "pending";

      insertTournamentInfo(req.body.form)
        .then((res) => {
          console.log('SEEDED TOURNAMENT')
        })
        .catch((err) => {
          console.log("There was an error seeding");
        })
    })
    .catch((error) => {
      console.log("Error creating new tournament", error)
    })
})

router.post('/startTournament', (req, res) => {
  // console.log('Start tournament');
  axios.post(`${baseUrl}/${req.body.tournamentId}/start.json?api_key=${api_key}`)
    .then((result) => {
      res.status(200).end();
    })
    .then(() => {
      updateTournamentStatus(req.body.tournamentId, "active")
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        })
    })
    .catch((err) => {
      console.log('Erorr starting Tournament', err)
    })
})

router.post('/updateMatch', (req, res) => {
  // console.log("Updating Winner");
  let { participant_id, tournament_id } = req.body;
  axios.get(`${baseUrl}/${tournament_id}/matches.json?api_key=${api_key}&state=open&participant_id=${participant_id}`)
  .then((result) => {
    console.log(result.data, "THIS IS THE DAATA");
      let obj = { match: {} };
      let loserId = '';
      let match_id = result.data[0]["match"]["id"];
      let player_one = result.data[0]["match"]["player1_id"];
      let player_two = result.data[0]["match"]["player2_id"];
      if (player_one === participant_id) {
        obj["match"]["scores_csv"] = "1-0";
        loserId = player_two;
      } else {
        obj["match"]["scores_csv"] = "0-1";
        loserId = player_one;
      }
      obj["match"]["winner_id"] = participant_id;
      // console.log('loserid:', loserId);
      axios.put(`${baseUrl}/${tournament_id}/matches/${match_id}.json?api_key=${api_key}`, obj)
        .then((result) => {
          res.send({ "loserId": loserId });
        })
        .catch((err) => {
          console.log('Error posting winner', err)
        })
    })
    .catch((err) => {
      console.log("Error getting match id", err);
    })
})

router.put('/finalizeTournament', (req, res) => {
  let id = req.body.tournamentId;
  axios.post(`${baseUrl}/${id}/finalize.json?api_key=${api_key}`)
    .then((result) => {
      console.log('Finalized tournament');
      res.status(200).end();
    })
    .catch((err) => {
      console.log("Error finalizing tournament:", err);
    })
})

router.post('/declareWinner', (req, res) => {
  console.log(req.body, 'this is on declare winner');
  let { tournamentId, username, winnings } = req.body;
  updateWinner(tournamentId, username, winnings)
    .then((data) => {
      res.send(data);
    })
    .then(() => {
      updateTournamentStatus(tournamentId, "completed")
        .then((data2) => {
          console.log(data2);
        })
        .catch((err) => {
          console.log(err);
        })
    })
    .catch((error) => {
      console.log(error);
    })
})
//john keanu neo michael blue biden trump
router.get('/top', (req, res) => {
  let result = {};
  topFiveEarners()
    .then((data) => {
      result.earners = data;
      topFiveWinners()
        .then((data2) => {
          result.winners = data2;
          topFiveRatio()
            .then((data3) => {
              result.ratio = data3;
              res.send(result);
            })
        })
    })
    .catch((err) => {
      console.log(err);
    })
})

router.get('/checkUser', (req, res) => {
  let { username } = req.query;
  findUserByName(username)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    })
})

router.get('/openTournaments', (req, res) => {
  findTournamentByStatus()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    })
})

router.get('/organizerData', (req, res) => {
  let { hostName } = req.query;
  let result = null;
  findTournamentByHostName(hostName)
    .then((data) => {
      result = data;
      result.map((x, i) => {
        let arr = [];
        let count = 0;
        x.registered.map((y, j) => {
          return new Promise((resolve, reject) => {
            findUserById(y)
              .then((res) => {
                count++;
                arr.push({ name: res.name, id: res.userId, challongeId: res.challongeId });
                if(count === x.registered.length) {
                  resolve(arr);
                }
              })
              .catch((error) => {
                reject(error)
              })
          })
            .then((data) => {
              result[i].registered = data;
              if(i === result.length - 1) {
                res.send(result);
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
      })
    })
    .catch((err) => {
      console.log(err);
    })
})


module.exports = router;