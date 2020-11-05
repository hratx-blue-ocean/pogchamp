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
  const [firstPairing, setFirstPairing] = useState(true);

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
    }
    setRoundWinners({...roundWinners, ...newRoundWinners});
  }

  const handlePairings = (e) => {
    e.preventDefault();
    checkWinners();
    let newPairs = [];

    let randomized =
      Object.entries(playerInfo)
      .sort(() => Math.random() - 0.5);

    let sorted =
      Object.entries(playerInfo)
      .sort((a, b) => b[1] - a[1]);

    let transformedArray;

    if(firstPairing === true) {
      setFirstPairing(false)
      transformedArray = randomized;
    } else {
      transformedArray = sorted;
    }

    for(let i = 0; i < transformedArray.length; i+=2) {
      newPairs.push([transformedArray[i][0], transformedArray[i+1][0]]);
    }

    setPairs(newPairs);
    if(gameDetails.currentRound <= Number(gameDetails.rounds)) {
      gameDetails.currentRound ++;
    }
  }

  const revealWinner = () => {
    let highestScore = playerInfo[pairs[0][0]];
    let tiedArray = [];

    pairs.forEach(pair => {
      if(playerInfo[pair[0]] >= highestScore) {
        tiedArray.push(pair[0]);
      }
      if(playerInfo[pair[1]] >= highestScore) {
        tiedArray.push(pair[1]);
      }
    })

    if(tiedArray.length > 1) {
      setGameDetails({...gameDetails, winner: tiedArray})
    } else {
      setGameDetails({...gameDetails, winner: pairs[0][0]})
    }
  }

  return (
    <Container maxWidth="lg" className="swissPairing">
        <div className="game-details">
          <h2>{gameDetails.tournamentName}</h2>
          <h4>{gameDetails.gameName}</h4>
          <p>{gameDetails.rounds ? `Total Rounds: ${gameDetails.rounds}` : ''}</p>
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
              <p>If odd number of players, add player named "Bye". If player gets a bye, give them 1 point for that round.</p>
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
                  gameDetails.winner !== '' && !Array.isArray(gameDetails.winner)
                    ? <Container maxWidth="sm" className="pairings-container">
                        <h2>{gameDetails.winner} wins!!</h2>
                      </Container>
                    : ''
                }
                {
                  gameDetails.winner !== '' && Array.isArray(gameDetails.winner)
                    ? <Container maxWidth="sm" className="pairings-container">
                      <h2>It's a tie!</h2>
                        { gameDetails.winner.map(player => {
                          return <p>{player}</p>
                        }) }
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