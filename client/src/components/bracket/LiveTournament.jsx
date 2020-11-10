import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Grid,
  Tooltip,
  Typography
} from '@material-ui/core';
import axios from 'axios';

function LiveTournament({ players, prizes, live_image_url, winners, registerOrStart, startMatch }) {
  let styles = { backgroundColor: "orange", height: 25, margin: 3.5 };
  let thirdPlaceAmount = Math.floor(prizes.third / 2);
  const openInNewTab = (e) => {
    e.preventDefault()
    let url = live_image_url;
    const newWindow = window.open(url, '_blank', 'noopener, noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <React.Fragment>
      <Grid item xs={12}><h1 className="title">Bracket Tournament</h1></Grid>
      {live_image_url && players.length >= 1 &&
      <Grid item xs={3}>
        <span>
          <button style={styles} onClick={() => window.print()} >Print Page</button>
          <button style={styles} onClick={(e) => openInNewTab(e)} >Print Bracket</button>
        </span>
      </Grid>
      }

      { players.length === 1 ?
        <div>
          <h3>{winners.first.participant.name} ${prizes.first}</h3>
          <h3>{winners.second.participant.name} ${prizes.second}</h3>
          <h3>{winners.third[0].participant.name} ${thirdPlaceAmount} AND {winners.third[1].participant.name} ${thirdPlaceAmount}</h3>
        </div> : null
      }

      { players.length === 0 ?
        <div style={{ height: 550 }}>
          <h4 style={{ color: "grey" }}>Click "Create New Tournament" to begin</h4>
        </div> : null
      }
      {registerOrStart === "register" ? <Grid item xs={3}><Button onClick={() => {startMatch()}}type="submit" variant="outlined">
        Start Tournament
        </Button></Grid> : null}
    </React.Fragment>
  );
}

export default LiveTournament;