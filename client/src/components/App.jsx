import React from 'react';
import LandingPage from './LandingPage.jsx';
import SwissController from './swiss/SwissController.jsx';
import BracketForm from './BracketForm.jsx';
import PopulateForm from './PopulateForm.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const App = () => {
  return (
    <Router>
      <h1><Link to="/">Pogchamp</Link></h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/swiss">Swiss</Link>
        </li>
        <li>
          <Link to="/bracket">Bracket</Link>
        </li>
      </ul>

      <Switch>
        <Route path="/swiss">
          <SwissController />
        </Route>
        <Route path="/bracket">
          <PopulateForm />
          <BracketForm />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;