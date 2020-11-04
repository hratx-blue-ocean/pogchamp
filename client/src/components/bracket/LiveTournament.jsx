import React from 'react';

function LiveTournament({players}) {
  return (
    <React.Fragment>
      <h3>Tournament View</h3>
      <h1>Live Bracket Tournament</h1>
      {players.length === 0 && players.length === 1 &&  
        <div style={{height: 550}}>
        <h4>New tournament will display here</h4>
      </div>}
    </React.Fragment>
  );
}

export default LiveTournament;