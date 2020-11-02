import React, { useState, useRef } from 'react';
import { Container, Grid, Button, TextField, FormControl } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './BracketForm.css';

const BracketForm = () => {

  const [bracketDetails, setBracketDetails] = useState({
    tournamentName: '',
    gameName: '',
    numberOfPlayers: 0,
    prizeAmount: 0
  });

  const [playersInTournament, setPlayers] = useState({
    participants: []
  });

  const playerName = useRef(null);

  const tournament = useRef(null);
  const game = useRef(null);
  const players = useRef(null);
  const prize = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setBracketDetails({
      tournamentName: tournament.current.value,
      gameName: game.current.value,
      numberOfPlayers: players.current.value,
      prizeAmount: prize.current.value
    })
  }

  const handleAddingPlayers = (e) => {
    e.preventDefault();

    let player = playerName.current.value;
    // console.log('this is the entire', player);

    setPlayers({ participants: [...playersInTournament.participants, { name: player }] });

    console.log("these are all the players", playersInTournament);
  }


  return (
    <Container maxWidth="lg" className="bracketForm">
      <h1>Bracket</h1>
      <div>
        <h4>Tournament Name: {bracketDetails.tournamentName}</h4>
        <h4>Game Name: {bracketDetails.gameName}</h4>
        <h4>Number of Players: {bracketDetails.numberOfPlayers}</h4>
        <h4>Prize Amount: {bracketDetails.prizeAmount}</h4>
      </div>

      <form noValidate autoComplete="off" onSubmit={handleSubmit} className="setup-form">
        <TextField label="tournament name" inputRef={tournament} />
        <TextField label="game name" inputRef={game} />
        <TextField label="number of players" inputRef={players} />
        <TextField label="prize amount" inputRef={prize} />
        <Button type="submit">Submit</Button>
      </form>

      <form noValidate autoComplete="off" onSubmit={handleAddingPlayers} className="setup-form">
        <TextField label="player name" inputRef={playerName} />
        <Button type="submit">Add</Button>
      </form>

      {
        playersInTournament.participants === []
          ? ''
          :
          <div>
            {playersInTournament.participants.map(player => {
              return (
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  className="bracket-player"
                >
                  <p>
                    <h4>{player.name}</h4> <DeleteForeverIcon/>
                  </p>

                </Grid>
              )
            })}
          </div>
      }
    </Container>

  )
}

export default BracketForm;

{/* <Grid
  container
  direction="row"
  justify="space-between"
  alignItems="center"
  className="bracket-player"
>
  <p>
    <h4>{player.name}</h4> <DeleteForeverIcon />
  </p>

</Grid> */}