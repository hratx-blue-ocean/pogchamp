import React, { useState, useRef } from 'react';
import { Container, Grid, Button, TextField, FormControl } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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

    let player =  playerName.current.value;
    // console.log('this is the entire', player);

    setPlayers({ participants: [...playersInTournament.participants, {name: player}]});

    console.log("these are all the players" , playersInTournament);
  }


  return (
    <Container>
    <h1>Bracket</h1>
    <div>
      <h4>Tournament Name: {bracketDetails.tournamentName}</h4>
      <h4>Game Name: {bracketDetails.gameName}</h4>
      <h4>Number of Players: {bracketDetails.numberOfPlayers}</h4>
      <h4>Prize Amount: {bracketDetails.prizeAmount}</h4>
    </div>

    <form noValidate autoComplete="off" onSubmit={handleSubmit} className="setup-form">
      <TextField label="tournament name" inputRef={tournament}/>
      <TextField label="game name" inputRef={game}/>
      <TextField label="number of players" inputRef={players}/>
      <TextField label="prize amount" inputRef={prize}/>
      <Button type="submit">Submit</Button>
    </form>

    <form noValidate autoComplete="off" onSubmit={handleAddingPlayers} className="setup-form">
      <TextField label="player name" inputRef={playerName}/>
      <Button type="submit">Add</Button>
    </form>

    {
      playersInTournament.participants === []
      ? ''
      :
      <div>
        {playersInTournament.participants.map(player => {
          return (
           <h4>{player.name}</h4>
          )
        })}
      </div>
    }
  </Container>

)
}

export default BracketForm;




//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="enter tournament name" inputRef={tournament}/>

//         <input type="text" placeholder="enter game name" inputRef={game}/>

//         <input type="text" placeholder="enter number of players" inputRef={players}/>

//         <input type="text" placeholder="enter prize amount" inputRef={prize}/>

//         <button type="add">Submit</button>
//       </form>

//       <form onSubmit={handleAddingPlayers}>
//         <input type="text" placeholder="enter player name" inputRef={playerName}/>
//         <button>Submit</button>
//       </form>

//       {
//         playersInTournament.participants === []
//         ? ''
//         :
//         <div>
//           {playersInTournament.participants.map(player => {
//             return <h1>{player.name}</h1>
//           })}
//         </div>
//       }

//       {
//         bracketDetails === {}
//         ? ''
//         : <div>
//           <h2> this is the tournament name: {bracketDetails.tournamentName}</h2>
//           <h2> this is the game name: {bracketDetails.gameName}</h2>
//           <h2> this is the number of players: {bracketDetails.numberOfPlayers}</h2>
//           <h2> this is the prize amount: {bracketDetails.prizeAmount}</h2>
//         </div>
//       }
//     </div>
//   )
// }