import React, { useState, useRef } from 'react';
import { Button } from '@material-ui/core';


const SwissController = (props) => {
  const [gameDetails, setGameDetails] = useState({
    tournamentName: '',
    gameName: '',
    rounds: '',
    currentRound: 0,
    winner: ''
  });

  const [playerInfo, setPlayerInfo] = useState({});
  const [pairs, setPairs] = useState([]);

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
    if(playerInfo[playerName] === undefined) {
      setPlayerInfo({...playerInfo, [playerName]: 0})
    }
  }

  const handlePairings = (e) => {
    e.preventDefault();
    let newPairs = [];
    const sorted =
      Object.entries(playerInfo)
      .sort((a, b) => b[1] - a[1])

    for(let i = 0; i < sorted.length; i+=2) {
      newPairs.push([sorted[i][0], sorted[i+1][0]]);
    }
    setPairs(newPairs);
    if(gameDetails.currentRound < Number(gameDetails.rounds)) {
      gameDetails.currentRound ++;
    }
  }

  const handleScoreUpdate = (e, player) => {
    e.preventDefault();
    let currentScore = parseInt(listRefs.get(player).current.value);
    if(currentScore) {
      let newScore = playerInfo[player] + currentScore;
      setPlayerInfo({...playerInfo, [player]: newScore});
    }
  }

  const revealWinner = () => {
    setGameDetails({...gameDetails, winner: pairs[0][0]})
  }

  return (
    <div className="swissPairing">
      <h1>Swiss Pairing</h1>
      <div>
        <h4>Tournament Name: {gameDetails.tournamentName}</h4>
        <h4>Game Name: {gameDetails.gameName}</h4>
        <h4>Total Rounds: {gameDetails.rounds}</h4>
      </div>

      <form onSubmit={handleSubmit} className="setup-form">
        <h2>Add your tournament details:</h2>
        <input type="text" placeholder="tournament name" ref={tournamentRef}></input>
        <input type="text" placeholder="game name" ref={game}></input>
        <input type="text" placeholder="number of rounds" ref={rounds}></input>
        <button>Submit</button>
      </form>
      {
        gameDetails.rounds !== ''
          ? <form onSubmit={handleAddPlayer} className="setup-form">
              <h2>Add the players:</h2>
              <input type="text" placeholder="enter player name" ref={players}></input>
              <button>Submit</button>
            </form>
          : ''
      }
      {
        playerInfo === {}
          ? ''
          : <div>
            <h4>Players:</h4>
              {Object.keys(playerInfo).map((player, index) => {
                listRefs.set(player, React.createRef())
                return (
                  <div key={index} className="swiss-player">
                    <p>{player} - {playerInfo[player]}</p>
                    <form onSubmit={(e) => handleScoreUpdate(e, player)}>
                      <input ref={listRefs.get(player)}></input>
                      <button type="submit">add to score</button>
                    </form>
                  </div>
                )
              })}
            </div>
      }
      <Button
        variant="contained"
        color="primary"
        onClick={handlePairings}
        className="create-pairings">Create Pairings</Button>
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
      {
        gameDetails.currentRound === parseInt(gameDetails.rounds)
          ? <div>
            <Button
              variant="contained"
              color="primary"
              className="create-pairings"
              onClick={revealWinner}>Reveal Winner!</Button>
            <p>{gameDetails.winner !== '' ? <p>{gameDetails.winner} wins!</p> : ''}</p>
            </div>
          : ''
      }
    </div>
  )
}

export default SwissController;