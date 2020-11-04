import React, { useState, useRef } from "react";
import {
  Container,
  Grid,
  Button,
  TextField,
  FormControl,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";

const BracketForm = ({ startTournament }) => {
  const [bracketDetails, setBracketDetails] = useState({
    tournamentName: "",
    description: "",
    gameName: "",
    numberOfPlayers: 0,
    prizeAmount: 0,
    show: false,
  });

  const [playersInTournament, setPlayers] = useState({
    participants: [],
  });

  const playerName = useRef(null);
  const tournament = useRef(null);
  const game = useRef(null);
  const players = useRef(null);
  const prize = useRef(null);
  const description = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setBracketDetails({
      tournamentName: tournament.current.value,
      gameName: game.current.value,
      numberOfPlayers: players.current.value,
      prizeAmount: prize.current.value,
      description: description.current.value,
      show: true,
    });

    tournament.current.value = "";
    game.current.value = "";
    players.current.value = "";
    prize.current.value = "";
    description.current.value = "";
  };

  const handleAddingPlayers = (e) => {
    e.preventDefault();

    let player = playerName.current.value;
    setPlayers({
      participants: [...playersInTournament.participants, { name: player }],
    });
    playerName.current.value = "";
  };

  const deletePlayers = (e, name) => {
    e.preventDefault();

    let deletePlayer = name;
    let filteredPlayers = playersInTournament.participants.filter(function (
      player
    ) {
      return player.name !== deletePlayer;
    });

    setPlayers({ participants: filteredPlayers });
  };

  const handleTournament = (e) => {
    e.preventDefault();
    if (players.length <= 3) {
      alert("Need atleast 4 players to start tournament");
    } else {
      //invoke the start function brackComponent
      //get details, players
      startTournament(bracketDetails, playersInTournament);
    }
  };

  return (
    <Container maxWidth="lg" className="bracketForm">
      <h1 className="title">Bracket</h1>
      {bracketDetails.show === false ? (
        ""
      ) : (
        <div>
          <h4>Tournament Name: {bracketDetails.tournamentName}</h4>
          <h4>Game Name: {bracketDetails.gameName}</h4>
          <h4>Number of Players: {bracketDetails.numberOfPlayers}</h4>
          <h4>Prize Amount: ${bracketDetails.prizeAmount}</h4>
        </div>
      )}

      <form autoComplete="off" onSubmit={handleSubmit} className="setup-form">
      <h3>Enter Tournament Information</h3>
        <TextField
          required
          label="tournament name"
          variant="outlined"
          size="small"
          helperText="* required field"
          inputRef={tournament}
        />
        <TextField
          required
          label="game name"
          variant="outlined"
          size="small"
          inputRef={game}
        />
        <TextField
          required
          label="number of players"
          variant="outlined"
          size="small"
          inputRef={players}
        />
        <TextField
          required
          label="prize amount"
          variant="outlined"
          size="small"
          inputRef={prize}
        />
        <TextField
          required
          label="description"
          variant="outlined"
          size="small"
          inputRef={description}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>

      <form
        autoComplete="off"
        onSubmit={handleAddingPlayers}
        className="setup-form"
      >
        <TextField
          required
          label="player name"
          variant="outlined"
          size="small"
          helperText="Minimum of 4 Players Required"
          inputRef={playerName}
        />
        <Button type="submit" variant="contained">
          Add Player
        </Button>
      </form>

      {playersInTournament.participants === [] ? (
        ""
      ) : (
        <div>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className="bracket-player"
            item
            xs={12}
          >
            {playersInTournament.participants.map((player, i) => {
              return (
                <Grid item xs={3} key={i}>
                  <h4>{player.name} <DeleteForeverIcon
                  className="delete"
                    fontSize="small"
                    onClick={(e) => {
                      deletePlayers(e, player.name);
                    }}
                  /></h4>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
      <form noValidate autoComplete="off" className="setup-form">
        {playersInTournament.participants.length >= 4
        ?
        <Button
          type="submit"
          variant="contained"
          onClick={(event) => {
            handleTournament(event);
          }}
        >
          Start Tournament
        </Button>
        :
        <Button type="submit" variant="outlined" disabled>
        Start Tournament
        </Button>
      }
      </form>
    </Container>
  );
};

export default BracketForm;

