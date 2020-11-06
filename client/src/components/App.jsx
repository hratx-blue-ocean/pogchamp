import React from 'react';
import LandingPage from './LandingPage.jsx';
import SwissController from './swiss/SwissController.jsx';
import BracketComponent from './bracket/BracketComponent.jsx';
import OrganizerDashboard from './OrganizerDashboard/OrganizerDashboard.jsx';
import PlayerDashboard from './PlayerDashboard/PlayerDashboard.jsx';
import Navigation from './Navigation.jsx';
import Footer from './Footer.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import { Grid, Paper, Modal } from '@material-ui/core';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  const [login, showLogin] = React.useState(false);

  return (
    <Router>
      <div className="header">
        <Navigation handleLogin={showLogin} />
        <Login show={login} handleShow={showLogin} />
        <ul className="navigation">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/player-dashboard">Player Dashboard</Link>
          </li>
          <li>
            <Link to="/organizer-dashboard">Organizer Dashboard</Link>
          </li>
          <li>
            <Link to="/swiss">Swiss</Link>
          </li>
          <li>
            <Link to="/bracket">Bracket</Link>
          </li>
        </ul>
      </div>

      <Switch>
        <Route path="/swiss">
          <SwissController />
        </Route>
        <Route path="/bracket">
          <BracketComponent />
        </Route>
        <Route path="/organizer-dashboard">
          <OrganizerDashboard />
        </Route>
        <Route path="/player-dashboard">
          <PlayerDashboard />
        </Route>
        <Route path="/signup">
          <SignUp handleModal={showLogin}/>
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>

      </Switch>
      <Footer />
    </Router>
  );
}

const Login = ({ show, handleShow }) => {
  const body = (
    <div id="loginModal">
      <h2>Login</h2>
      <SignIn />
    </div>
  );

  return (
    <div id="modalContainer">
      <Modal
        open={show}
        onClose={() => handleShow(false)}
      >
        {body}
      </Modal>
    </div>
  );
}

export default App;