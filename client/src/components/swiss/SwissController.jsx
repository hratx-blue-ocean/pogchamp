import React, { useState, useRef } from 'react';
import { Container, Grid, Button, TextField } from '@material-ui/core';
import SwissPlayers from './SwissPlayers.jsx';
import './SwissController.css';

const SwissController = (props) => {
  const [gameDetails, setGameDetails] = useState({
    tournamentName: '',
    gameName: '',
    rounds: '',
    currentRound: 0,
    winner: ''
  });

  const [playerInfo, setPlayerInfo] = useState({});
  const [roundWinners, setRoundWinners] = useState({});
  const [pairs, setPairs] = useState([]);
  const [currentRoundScores, setCurrentRoundScores] = useState({});

  const tournamentRef = useRef(null);
  const game = useRef(null);
  const rounds = useRef(null);
  const players = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setGameDetails({...gameDetails,
      tournamentName: tournamentRef.current.value,
      gameName: game.current.value,
      rounds: rounds.current.value
    })
  }

  const handleAddPlayer = (e) => {
    e.preventDefault();

    let playerName = players.current.value;
    let roundArray = [];

    if(playerInfo[playerName] === undefined) {
      for(let i = 1; i <= Number(gameDetails.rounds); i++) {
        roundArray.push(false)
      }
      setRoundWinners({...roundWinners, [playerName]: roundArray})
      setPlayerInfo({...playerInfo, [playerName]: 0})
      setCurrentRoundScores({...currentRoundScores, [playerName]: 0})
    }
    players.current.value = '';
  }

  const checkWinners = () => {
    let newRoundWinners = {};

    let createArray = (winner) => {
      let roundArray = [...roundWinners[winner]];
      roundArray.splice((Number(gameDetails.currentRound) - 1), 1, true);
      newRoundWinners[winner] = roundArray;
    }

    for(let i = 0; i < pairs.length; i++) {
      let firstPlayer = pairs[i][0];
      let secondPlayer = pairs[i][1];
      let winner =
        currentRoundScores[firstPlayer] > currentRoundScores[secondPlayer]
        ? firstPlayer
        : secondPlayer;

      createArray(winner);
      console.log('winner is', winner)
    }
    setRoundWinners({...roundWinners, ...newRoundWinners});
  }

  const handlePairings = (e) => {
    checkWinners();
    e.preventDefault();

    let newPairs = [];
    const sorted =
      Object.entries(playerInfo)
      .sort((a, b) => b[1] - a[1])

    for(let i = 0; i < sorted.length; i+=2) {
      newPairs.push([sorted[i][0], sorted[i+1][0]]);
    }
    setPairs(newPairs);
    if(gameDetails.currentRound <= Number(gameDetails.rounds)) {
      gameDetails.currentRound ++;
    }
  }

  const revealWinner = () => {
    if(playerInfo[pairs[0][0]] === playerInfo[pairs[0][1]]) {
      // TO DO: Show who is tied instead of default "It's a tie"
      // account for multiple player ties
      setGameDetails({...gameDetails, winner: 'tie'})
    } else {
      setGameDetails({...gameDetails, winner: pairs[0][0]})
    }
  }

  return (
    <Container maxWidth="lg" className="swissPairing">
      <h1>Swiss Pairing</h1>
      <div>
        <h4>Tournament Name: {gameDetails.tournamentName}</h4>
        <h4>Game Name: {gameDetails.gameName}</h4>
        <h4>Total Rounds: {gameDetails.rounds}</h4>
      </div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit} className="setup-form">
        <h2>Add your tournament details:</h2>
        <TextField label="tournament name" variant="outlined" size="small" inputRef={tournamentRef} />
        <TextField label="game name" variant="outlined" size="small" inputRef={game} />
        <TextField label="number of rounds" variant="outlined" size="small" inputRef={rounds} />
        <Button variant="contained" type="submit">Submit</Button>
      </form>

      {
        gameDetails.rounds !== ''
          ? <form onSubmit={handleAddPlayer} className="setup-form">
              <h2>Add the players:</h2>
              <p>If odd number of players, add player named "Bye". If player gets a bye, give them 1 points for that round.</p>
              <TextField label="enter player name" variant="outlined" size="small" inputRef={players} />
              <Button variant="contained" type="submit">Submit</Button>
            </form>
          : ''
      }
      {
        gameDetails.currentRound === (parseInt(gameDetails.rounds) + 1)
          ? <div>
              <Button
                variant="contained"
                color="primary"
                className="create-pairings"
                onClick={revealWinner}>Reveal Winner!</Button>

                {
                  gameDetails.winner !== '' && gameDetails.winner !== 'tie'
                    ? <Container maxWidth="sm" className="pairings-container">
                        <h2>{gameDetails.winner} wins!!</h2>
                      </Container>
                    : ''
                }
                {
                  gameDetails.winner !== '' && gameDetails.winner === 'tie'
                    ? <Container maxWidth="sm" className="pairings-container">
                        <h2>It's a tie!</h2>
                      </Container>
                    : ''
                }

            </div>
          : <div>
              { gameDetails.currentRound === 0
                ? <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePairings}
                    className="create-pairings">Create Pairings</Button>
                : ''
              }
                <Container maxWidth="sm" className="pairings-container">
                  {
                    gameDetails.currentRound > 0
                      ? <h2>Round {gameDetails.currentRound}</h2>
                      : <p>Add players and click "Create pairings" to begin</p>
                  }
                  {
                    pairs.length
                      ? pairs.map((pair, index) => {
                          return <p key={index}>{ pair[0] } vs { pair[1] }</p>
                        })
                      : ''
                  }
                </Container>
            </div>
      }
      <SwissPlayers
        gameDetails={gameDetails}
        playerInfo={playerInfo}
        currentRoundScores={currentRoundScores}
        setCurrentRoundScores={setCurrentRoundScores}
        setPlayerInfo={setPlayerInfo}
        roundWinners={roundWinners}
        handlePairings={handlePairings}/>
    </Container>
  )
}

export default SwissController;