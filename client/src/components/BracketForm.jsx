import React, { useState, useRef } from 'react';

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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="enter tournament name" ref={tournament}/>

        <input type="text" placeholder="enter game name" ref={game}/>

        <input type="text" placeholder="enter number of players" ref={players}/>

        <input type="text" placeholder="enter prize amount" ref={prize}/>

        <button type="add">Submit</button>
      </form>

      <form onSubmit={handleAddingPlayers}>
        <input type="text" placeholder="enter player name" ref={playerName}/>
        <button>Submit</button>
      </form>

      {
        playersInTournament.participants === []
        ? ''
        :
        <div>
          {playersInTournament.participants.map(player => {
            return <h1>{player.name}</h1>
          })}
        </div>
      }

      {
        bracketDetails === {}
        ? ''
        : <div>
          <h2> this is the tournament name: {bracketDetails.tournamentName}</h2>
          <h2> this is the game name: {bracketDetails.gameName}</h2>
          <h2> this is the number of players: {bracketDetails.numberOfPlayers}</h2>
          <h2> this is the prize amount: {bracketDetails.prizeAmount}</h2>
        </div>
      }
    </div>
  )
}

export default BracketForm;