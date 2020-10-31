import React, { useState, useRef } from 'react';

const SwissController = (props) => {
  const [gameDetails, setGameDetails] = useState({
    tournamentName: 'Set tournament name',
    gameName: 'Set game name',
    rounds: 0
  });

  const [playerInfo, setPlayerInfo] = useState({});

  const tournamentRef = useRef(null);
  const game = useRef(null);
  const rounds = useRef(null);
  const players = useRef(null);


  // store users in state with 0 points at the beginning
  // INPUTS:
  // - how many rounds
  // - players
  // - game name

  const handleSubmit = () => {
    e.preventDefault();

    setGameDetails({
      tournamentName: tournamentRef.current.value,
      gameName: game.current.value,
      rounds: rounds.current.value,
    })
  }

  const handleAddPlayer = () => {
    e.preventDefault();
    let playerName = players.current.value;
    if(playerInfo[playerName] === undefined) {
      setPlayerInfo({...playerInfo, [playerName]: 0})
      console.log('added')
    }
    playerName = '';
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="tournament name" ref={tournamentRef}></input>
        <input type="text" placeholder="game name" ref={game}></input>
        <input type="text" placeholder="number of rounds" ref={rounds}></input>
        <button>Submit</button>
      </form>
      <form onSubmit={handleAddPlayer}>
        <input type="text" placeholder="enter player name" ref={players}></input>
        <button>Submit</button>
      </form>
      {
        gameDetails === {}
          ? ''
          : <div>
              <h2>{gameDetails.tournamentName}</h2>
              <h2>{gameDetails.gameName}</h2>
              <h2>{gameDetails.rounds}</h2>
            </div>
      }
    </div>
  )

}

export default SwissController;