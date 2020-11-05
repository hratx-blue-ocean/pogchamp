import React from 'react';
// import { PrintIcon } from '@material-ui/icons';

function LiveTournament({players, prizes, live_image_url}) {
  const openInNewTab = (e) => {
    e.preventDefault()
    let url = live_image_url;
    const newWindow = window.open(url, '_blank', 'noopener, noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <React.Fragment>
      {/* <h3>Tournament View</h3> */}
      <h1 className="title">Live Bracket Tournament</h1>
      {live_image_url && players.length >= 1 &&
      <span> 
      <button onClick={() => window.print()} >Print Page</button>
      <button onClick={(e) => openInNewTab(e) } >Print Bracket</button>
      </span>
      }

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