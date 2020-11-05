import React from 'react';

function LiveTournament({players, prizes}) {
  return (
    <React.Fragment>
      {/* <h3>Tournament View</h3> */}
      <h1 className="title">Live Bracket Tournament</h1>

      { players.length === 1 ?
        <div>
         <h3>First Place ${prizes.first}</h3>
         <h3>Second Place ${prizes.second}</h3>
         <h3>Third Place ${prizes.third}</h3>
        </div> : null
      }

      { players.length === 0 ?
        <div style={{height: 550}}>
          <h4 style={{color: "grey"}}>Will show tournament here</h4>
        </div> : null
      }
    </React.Fragment>
  );
}

export default LiveTournament;