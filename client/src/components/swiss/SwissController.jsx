import React, { useState, useRef } from 'react';
import { Container, Grid, Button, TextField, FormControl } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
  const score = useRef(null);
  let listRefs = new Map();

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
    }
    players.current.value = '';
  }


  const handlePairings = (e) => {
    e.preventDefault();

    let roundArray = [];
    let newRoundWinners = {};
    for(let i = 1; i <= Number(gameDetails.rounds); i++) {
      if(gameDetails.currentRound === i) {
        roundArray.push(true)
      } else {
        roundArray.push(false)
      }
    }

    for(let i = 0; i < pairs.length; i++) {
      let firstPlayer = pairs[i][0];
      let secondPlayer = pairs[i][1];
      let winner =
        currentRoundScores[firstPlayer] > currentRoundScores[secondPlayer]
        ? firstPlayer
        : secondPlayer;
      console.log(`Round ${gameDetails.currentRound} winner is ${winner} with ${currentRoundScores[winner]} points`)

      newRoundWinners[winner] = roundArray;
    }
    setRoundWinners({...roundWinners, ...newRoundWinners});

    // set new pairs
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

  // called every time score is added to player block
  const handleScoreUpdate = (e, player) => {
    e.preventDefault();
    // set cumulative score
    let currentScore = parseInt(listRefs.get(player).current.value);
    if(currentScore) {
      let newScore = playerInfo[player] + currentScore;
      setPlayerInfo({...playerInfo, [player]: newScore});
    }
    // set current round scores
    setCurrentRoundScores({...currentRoundScores, [player]: currentScore})
    listRefs.get(player).current.value = '';
  }

  const revealWinner = () => {
    if(playerInfo[pairs[0][0]] === playerInfo[pairs[0][1]]) {
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
              <Container maxWidth="sm" className="pairings-container">
                {
                  gameDetails.winner !== '' && gameDetails.winner !== 'tie'
                    ? <h2>{gameDetails.winner} wins!!</h2>
                    : ''
                }
                {
                  gameDetails.winner !== '' && gameDetails.winner === 'tie'
                    ? <h2>It's a tie!</h2>
                    : ''
                }
              </Container>
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
      {
        playerInfo === {}
          ? ''
          : <div>
            <h4>Players:</h4>
              {Object.keys(playerInfo).map((player, index) => {
                listRefs.set(player, React.createRef())
                return (
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    key={index}
                    className="swiss-player"
                  >
                  <Grid item sm={3}>
                    <p>{player} - {playerInfo[player]}</p>
                  </Grid>
                  <Grid item sm={5}>
                    <TableContainer>
                      <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Rounds</TableCell>
                          { roundWinners[player].map((round, index) => {
                            return <TableCell align="right">{index + 1}</TableCell>
                          })}
                        </TableRow>
                      </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Wins/Losses
                            </TableCell>
                            { roundWinners[player].map((round, index) => {
                              return round === true
                                ? <TableCell align="right">O</TableCell>
                                : <TableCell align="right">X</TableCell>
                            })}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item sm={4} align="right">
                    <form onSubmit={(e) => handleScoreUpdate(e, player)}>
                      <TextField label="add to score" variant="outlined" size="small" inputRef={listRefs.get(player)} />
                      <Button variant="contained" type="submit">add to score</Button>
                    </form>
                  </Grid>
                  </Grid>
                )
              })}
              {
                gameDetails.currentRound > 0 && gameDetails.currentRound !== (parseInt(gameDetails.rounds) + 1)
                  ? <Button onClick={handlePairings}
                      variant="outlined"
                      className="round-progress">
                      Round {gameDetails.currentRound} scoring complete</Button>
                  : ''
              }

            </div>
      }

    </Container>
  )
}

export default SwissController;