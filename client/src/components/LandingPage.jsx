import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import MainPage from './MainPage.jsx';
import SignUp from './signUp.jsx'

const LandingPage = (props) => {
  return (
    <div>
      <Grid container direction="row" alignItems="center" id="container">
        <Grid item xs={12} className="navBar">
          <div id="navigation">
            <p id="logo">POG CHAMP</p>
            <a id="signup" href="">sign in/sign up</a>
          </div>
        </Grid>
        <Grid container>
          <Grid item xs={2} className="sideBar">


                <div className="sideBarItem">
                  Top 5 Earners
              </div>
                <div className="sideBarItem">
                  Top 5 Most Recent Winners
              </div>
                <div className="sideBarItem">
                  Top 5 Players
              </div>

          </Grid>
          <Grid item xs={10} className="mainPage">
            <MainPage />

          </Grid>
        </Grid>
        <Grid item xs={12} className="footer">
          <span id="footer">footer</span>
        </Grid>
      </Grid>
    </div>
  )
}

export default LandingPage;