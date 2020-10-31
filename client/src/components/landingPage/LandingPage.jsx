import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
// Navbar with login/register button + cool logo
// Left Sidebar that stays fixed
// Description
// Tournaments

const LandingPage = (props) => {

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} className="navBar">
          <div id="navigation">
            Navbar
          </div>
        </Grid>
        <Grid container>
          <Grid item xs={3} className="sideBar">
            <div id="sideBar">
              sidebar
            </div>
          </Grid>
          <Grid item xs={9} className="mainPage">
            <div id="landing">
              main page
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default LandingPage;