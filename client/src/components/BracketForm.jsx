import React, { useState, useRef } from 'react';

const BracketForm = () => {

  const [bracketDetails, setBracketDetails] = useState({
    tournamentName: '',
    gameName: '',
    numberOfPlayers: 0,
    prizeAmount: 0
  });

  const tournament = useRef(null);
  const game = useRef(null);
  const players = useRef(null);
  const prize = useRef(null);

  const handleSubmit = () => {
    event.preventDefault();

    setBracketDetails({
      tournamentName: tournament.current.value,
      gameName: game.current.value,
      numberOfPlayers: players.current.value,
      prizeAmount: prize.current.value
    })
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

      {
        bracketDetails === {}
        ? ''
        : <div>
          <h2> this is tournament name: {bracketDetails.tournamentName}</h2>
          <h2> this is the game name: {bracketDetails.gameName}</h2>
          <h2> this is the number of players: {bracketDetails.numberOfPlayers}</h2>
          <h2> this is the prize amount: {bracketDetails.prizeAmount}</h2>
        </div>
      }
    </div>
  )
}

export default BracketForm;