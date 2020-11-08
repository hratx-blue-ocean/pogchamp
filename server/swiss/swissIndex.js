const express = require('express');
const router = express.Router();
const { createNewTournament } = require('../../db/index.js');

let count = 0;
router.post('/tournament', (req, res) => {
  let { gameDetails, playerInfo } = req.body;
  gameDetails.players = playerInfo;
  let {tournamentName, gameName, rounds } = gameDetails;
  let name = tournamentName;
  // console.log('something came in', req.body);
  //(name, hostName, gameName, location, city, type, playerLimit, rounds, totalPrize, players)
  let playerLimit = Object.keys(playerInfo).map((name) => 1).length;
  createNewTournament(name, hostName = null, gameName, location = null,
    city = null, type = "swiss", playerLimit, rounds, totalPrize = null,
      playerInfo, (err, result) => {
       if (err) {
         console.log('error inserting tournament', err);
         res.status(500).end();
       } else {
         console.log("sucess insert", result)
         res.status(200).end();
       }
  })
})

router.post('/winners', (req, res) => {
  console.log('posting winners', req.body);
  
})


module.exports = router;