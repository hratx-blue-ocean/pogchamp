import React from 'react';

function LiveTournament({players, prizes, winners}) {
  return (
    <React.Fragment>
      <h1 className="title">Bracket Tournament</h1>

      { players.length === 1 ?

        <div>
         <h3>{winners.first.participant.name} ${prizes.first}</h3>
         <h3>{winners.second.participant.name} ${prizes.second}</h3>
         <h3>{winners.third[0].participant.name}, {winners.third[1].participant.name} ${prizes.third}</h3>
        </div> : null
      }

      { players.length === 0 ?
        <div style={{height: 550}}>
          <h4 style={{color: "grey"}}>Click "Create New Tournament" to begin</h4>
        </div> : null
      }
    </React.Fragment>
  );
}

export default LiveTournament;