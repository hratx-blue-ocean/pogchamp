import React from 'react';

function LiveTournament({players, prizes, live_image_url, winners}) {
  let styles = {backgroundColor: "orange", height: 25, margin: 3.5};
  let thirdPlaceAmount = Math.floor(prizes.third / 2);
  const openInNewTab = (e) => {
    e.preventDefault()
    let url = live_image_url;
    const newWindow = window.open(url, '_blank', 'noopener, noreferrer')
    if (newWindow) newWindow.opener = null
  }
  return (
    <React.Fragment>
      <h1 className="title">Bracket Tournament</h1>
      {live_image_url && players.length >= 1 &&
      <span>
      {players.length === 1 && <button style={styles} onClick={() => window.print()} >Print Results</button> }
      
      <button style={styles} onClick={(e) => openInNewTab(e) } >Print Bracket</button>
      </span>
      }

      { players.length === 1 ?
        <div>
         <h3>1st: {winners.first.participant.name} ${prizes.first}</h3>
         <h3>2nd: {winners.second.participant.name} ${prizes.second}</h3>
         <h3>3rd: {winners.third[0].participant.name} ${thirdPlaceAmount} AND {winners.third[1].participant.name} ${thirdPlaceAmount}</h3>
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