import React from 'react';

function LiveTournament({players}) {
  return (
    <React.Fragment>
      <h3>Tournament View</h3>

      {/* Money prize here */}
      {players.length === 1 ?
      '' :
        <div>
          <p>First Place:</p>
          <p>Second Place:</p>
          <p>Third Place:</p>
        </div>
      }

      <h1>Live Bracket Tournament</h1>
<<<<<<< HEAD
      {players.length === 0 || players.length === 1 ?
=======
      {players.length === 0 ?  
>>>>>>> main
        <div style={{height: 550}}>
        <h4 style={{color: "grey"}}>Will show tournament here</h4>
      </div> : null}
    </React.Fragment>
  );
}

export default LiveTournament;