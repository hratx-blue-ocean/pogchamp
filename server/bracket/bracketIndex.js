const express = require('express');
const router = express.Router();
const axios = require('axios');
const baseUrl = 'https://api.challonge.com/v1/tournaments';
const { api_key } = require('./config.js');
const { insertTournamentInfo, updateUserInfo, updateTournament, findTournament, findUserByName, findUserById, updateWinner } = require('../../db/index.js');
// console.log('api key:', api_key);


router.post('/postParticipant', (req, res) => {
  console.log('posting new participants');
  let body = req.body;
  let result = null;
  let tournamentId = body.tournamentId;
  let participants = { "participants": body.participants };
  axios.post(`${baseUrl}/${tournamentId}/participants/bulk_add.json?api_key=${api_key}`, participants)
    .then((result) => {
      result = result.data;
      // console.log(result, "posted participants");
      res.send(result)
    })
    .then(() => {
      let arr = [];
      let count = 0;
      body.participants.map((username, i) => {
        new Promise((resolve, reject) => {
          updateUserInfo(username.name, tournamentId)
            .then((data) => {
              resolve(data)
            })
            .catch((err) => {
              reject(err);
            })
        })
          .then((result) => {
            count++;
            if (count === body.participants.length) {
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
            } else if (result !== null && count !== body.participants.length) {
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

router.post('/createTournament', (req, res) => {
  let body = req.body.data;
  let obj = { "name": body.name, "description": body.description };
  // console.log(obj, 'THIS IS THE OBJJJJJJJ');
  let tournamentId = null;
  let Url = null;
  axios.post(`${baseUrl}.json?api_key=${api_key}`, obj)
    .then((result) => {
      tournamentId = result.data.tournament.id;
      Url = result.data.tournament.id;
      res.send(result.data);
    })
    .then(() => {
      req.body.form.name = body.name;
      req.body.form.tournamentId = tournamentId;
      req.body.form.Url = Url;

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
    .catch((err) => {
      console.log('Erorr starting Tournament', err)
    })
})

router.post('/updateMatch', (req, res) => {
  // console.log("Updating Winner");
  let { participant_id, tournament_id } = req.body;

  axios.get(`${baseUrl}/${tournament_id}/matches.json?api_key=${api_key}&state=open&participant_id=${participant_id}`)
    .then((result) => {
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
  .catch((error) => {
    console.log('this is the error', error);
  })
})

module.exports = router;