import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Modal } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import MainPage from './MainPage.jsx';
import SideBar from './SideBar.jsx';
import axios from 'axios';

const LandingPage = (props) => {

  const [ topInfo, setTopInfo ] = useState(false);
  const [ stop, setStop ] = useState(0);
  //way around componentDidMount()
  useEffect(() => {
    showTopFive();
  }, [stop]);

  const showTopFive = () => {
    axios.get('/api/top')
    .then(results => {
      console.log(results.data);
      setTopInfo(results.data)
    })
    .catch(error => {
      console.log(error);
    })
  };


  return (
    <Container>
      <Grid container direction="row" alignItems="center" id="container">
        <Grid container>
          <Grid item xs={2} className="sideBar">
            {topInfo ? <SideBar topInfo={topInfo}/> : null}
          </Grid>
          <Grid item xs={9} className="mainPage">
            <MainPage />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default LandingPage;