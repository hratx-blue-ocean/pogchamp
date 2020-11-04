const express = require('express');
const router = express.Router();
const axios = require('axios');
const baseUrl = 'https://api.challonge.com/v1/tournaments';
const { api_key } = require('./config.js');
// console.log('api key:', api_key);

router.post('/postParticipant', (req, res) => {
  console.log('posting new participants');
  let body = req.body;  
  let result = null;
  let tournamentId = body.tournamentId;
  let participants = {"participants": body.participants};
  axios.post(`${baseUrl}/${tournamentId}/participants/bulk_add.json?api_key=${api_key}`, participants)
  .then((result) => {
    result = result.data;
    // console.log(result, "posted participants");
    res.send(result)
  })
  .catch((err) => {
    console.log(err);
  })
})

router.post('/createTournament', (req, res) => {
  // console.log('creating Tournament');
  let body = req.body;
  let obj = { "name": body.name, "description": body.description}
  axios.post(`${baseUrl}.json?api_key=${api_key}`, obj)
  .then((result) => {
    res.send(result.data);
  })
  .catch((error) => {
    console.log("error", error)
  })
})

router.post('/startTournament', (req, res) => {
  // console.log('Start tournament');
  axios.post(`${baseUrl}/${req.body.tournamentId}/start.json?api_key=${api_key}`)
  .then((result) => {
    res.status(200).end();
  })
  .catch((err) => {
  console.log('error', err)
  })
})

router.post('/updateMatch', (req, res) => {
  console.log("Updating Winner");
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
    console.log('loserid:', loserId);
    axios.put(`${baseUrl}/${tournament_id}/matches/${match_id}.json?api_key=${api_key}`, obj)
    .then((data) => {
      res.send({"loserId": loserId});
    })
    .catch((err) => {
      console.log('error posting winner:', err)
    })
  })
  .catch((err) => {
    console.log("error getting back matchid",err);
  })
})

module.exports = router;