import React, { useState, useEffect } from 'react';
import { Grid, Paper, Modal } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import MainPage from './MainPage.jsx';
import SignIn from './SignIn.jsx';


const LandingPage = (props) => {
  const [login, showLogin] = React.useState(false);

  return (
    <div>
      <Login show={login} handleShow={showLogin}/>
      <Grid container direction="row" alignItems="center" id="container">
        <Grid item xs={12} className="navBar">
          <div id="navigation">
            <p id="logo">POG CHAMP</p>
            <button id="signup" onClick={() => showLogin(!login)}>sign in/sign up</button>
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

const Login = ( { show, handleShow } ) => {
  const body = (
    <div id="loginModal">
      <h2>Login</h2>
      <SignIn />
    </div>
  );

  return (
    <div>
      <Modal
        open={show}
        onClose={() => handleShow(false)}
      >
        {body}
      </Modal>
    </div>
  );
}

export default LandingPage;