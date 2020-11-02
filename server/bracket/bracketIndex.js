const express = require('express');
const router = express.Router();
const axios = require('axios');
const api_key = '';

router.post('/postParticipant', (req, res) => {
  let body = req.body;  
  let result = null;
  let tournamentId = body.tournamentId;
  let participants = {"participants": body.participants};
  axios.post(`https://milito1234@api.challonge.com/v1/tournaments/${tournamentId}/participants/bulk_add.json?api_key=qgTPawy7NEkqDzkJ4cuykTJaJkRaNVkweRZEr8d7`, participants)
  .then((data) => {
    result = data.data;
    res.send(result)
  })
  .catch((err) => {
    console.log(err);
  })
  console.log('calling the challonge post')
  setTimeout(() => {
    console.log(result);
  }, 2000)
})

router.post('/createTournament', (req, res) => {
  console.log('api hit')
  let body = req.body;
  console.log(body);
  let obj = { "name": body.name, "description": body.description}
  axios.post(`https://api.challonge.com/v1/tournaments.json?api_key=${api_key}`, obj)
  .then((result) => {
    res.send(result.data)
  })
  .catch((error) => {
    console.log("error", error)
  })
})



module.exports = router;