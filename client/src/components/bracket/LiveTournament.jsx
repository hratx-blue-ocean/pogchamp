import React from 'react';
// import { PrintIcon } from '@material-ui/icons';

function LiveTournament({players, prizes, live_image_url}) {
  const openInNewTab = (e) => {
    e.preventDefault()
    let url = live_image_url;
    const newWindow = window.open(url, '_blank', 'noopener, noreferrer')
    if (newWindow) newWindow.opener = null
  }

function LiveTournament({players, prizes, winners}) {
  return (
    <React.Fragment>
      {/* <h3>Tournament View</h3> */}
      <h1 className="title">Bracket Tournament</h1>
      {live_image_url && players.length >= 1 &&
      <span>
      <button onClick={() => window.print()} >Print Page</button>
      <button onClick={(e) => openInNewTab(e) } >Print Bracket</button>
      </span>
      }

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