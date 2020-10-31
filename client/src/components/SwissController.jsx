import React, { useState, useRef } from 'react';

const SwissController = (props) => {
  const [gameDetails, setGameDetails] = useState({
    tournamentName: 'add tournament name',
    gameName: 'add game name',
    rounds: 'add rounds'
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

    setGameDetails({
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
  }

  const handleScoreUpdate = (e, player) => {
    e.preventDefault();
    let currentScore = parseInt(listRefs.get(player).current.value);
    if(currentScore) {
      let newScore = playerInfo[player] + currentScore;
      setPlayerInfo({...playerInfo, [player]: newScore});
    }
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

      <div>
        <h2>Tournament Name: {gameDetails.tournamentName}</h2>
        <h2>Game Name: {gameDetails.gameName}</h2>
        <h2>Rounds: {gameDetails.rounds}</h2>
      </div>

      {
        playerInfo === {}
          ? ''
          : <div>
            <h2>Players:</h2>
              {Object.keys(playerInfo).map((player, index) => {
                listRefs.set(player, React.createRef())
                return (
                  <div key={index}>
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
      <form>
        <button onClick={handlePairings}>Create pairings</button>
      </form>
      {
        pairs.length
          ? pairs.map((pair, index) => {
              return <p key={index}>{ pair[0] } vs { pair[1] }</p>
            })
          : ''
      }
    </div>
  )
}

export default SwissController;