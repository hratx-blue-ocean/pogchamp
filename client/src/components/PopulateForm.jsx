import React, { useState, useRef } from 'react';


const PopulateForm = (props) => {
  const [players, setPlayers] = useState({
    participants: []
  });

  const playerName = useRef(null);

  const handleAddingPlayers = (e) => {
    e.preventDefault();
    let player =  playerName.current.value;
    console.log('this is the entire', player);
    setPlayers({ participants: [...players.participants, {name: player}]});
  }

  console.log("these are the players", players);
  return (
    <div>
      this is the players
      {/* {players.participants} */}
      <form onSubmit={handleAddingPlayers}>
        <input type="text" placeholder="enter player name" ref={playerName}></input>
        <button>Submit</button>
      </form>
    </div>
  )
};

export default PopulateForm;

// import React, { useState, useRef } from 'react';


// const PopulateForm = (props) => {
//   const [players, setPlayers] = useState({
//     participants: ["daniel", "alec", "emily"]   /*{name: "daniel",}, {name: "alec"}*/
//   });

//   const playerName = useRef(null);

//   const handleAddingPlayers = (e) => {
//     e.preventDefault();
//     let player =  playerName.current.value;
//     console.log(player);
//     setPlayers({ participants: [...players.participants, player]});

//   }
//   console.log("these are the players", players);
//   return (
//     <div>
//       this is the players
//       {players.participants}
//       <form onSubmit={handleAddingPlayers}>
//         <input type="text" placeholder="enter player name" ref={playerName}></input>
//         <button>Submit</button>
//       </form>
//     </div>
//   )
// };

// export default PopulateForm;
