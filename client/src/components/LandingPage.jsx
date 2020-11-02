import React, { useState, useEffect } from 'react';
import { Grid, Paper, Modal } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import MainPage from './MainPage.jsx';
import SideBar from './SideBar.jsx';

const LandingPage = (props) => {


  return (
    <div>
      <Grid container direction="row" alignItems="center" id="container">
        <Grid container>
          <Grid item xs={2} className="sideBar">
            <SideBar />
          </Grid>
          <Grid item xs={10} className="mainPage">
            <MainPage />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default LandingPage;