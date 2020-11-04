import React from 'react';
import LandingPage from './LandingPage.jsx';
import SwissController from './swiss/SwissController.jsx';
import BracketComponent from './bracket/BracketComponent.jsx';
import OrganizerDashboard from './OrganizerDashboard/OrganizerDashboard.jsx';
import PlayerDashboard from './PlayerDashboard/PlayerDashboard.jsx';
import Navigation from './Navigation.jsx';
import Footer from './Footer.jsx';
import SignIn from './SignIn.jsx';
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

// export default App;

  // App.js
  import React from 'react';

  import * as go from 'gojs';
  import { ReactDiagram } from 'gojs-react';

  import './App.css';  // contains .diagram-component CSS

  // ...

  /**
   * Diagram initialization method, which is passed to the ReactDiagram component.
   * This method is responsible for making the diagram and initializing the model and any templates.
   * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
   */
  function initDiagram() {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram =
      $(go.Diagram,
        {
          'undoManager.isEnabled': true,  // must be set to allow for model change listening
          // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
          'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
          model: $(go.GraphLinksModel,
            {
              linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
            })
        });

    // define a simple Node template
    diagram.nodeTemplate =
      $(go.Node, 'Auto',  // the Shape will go around the TextBlock
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'RoundedRectangle',
          { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
          // Shape.fill is bound to Node.data.color
          new go.Binding('fill', 'color')),
        $(go.TextBlock,
          { margin: 8, editable: true },  // some room around the text
          new go.Binding('text').makeTwoWay()
        )
      );

    return diagram;
  }

  /**
   * This function handles any changes to the GoJS model.
   * It is here that you would make any updates to your React state, which is dicussed below.
   */
  // function handleModelChange(changes) {
  //   alert('GoJS model changed!');
  // }

  // render function...
  function App() {
    return (
      <div>

        <ReactDiagram
          initDiagram={initDiagram}
          divClassName='diagram-component'
          nodeDataArray={[
            { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
            { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
            { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
            { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }
          ]}
          linkDataArray={[
            { key: -1, from: 0, to: 1 },
            { key: -2, from: 0, to: 2 },
            { key: -3, from: 1, to: 1 },
            { key: -4, from: 2, to: 3 },
            { key: -5, from: 3, to: 0 }
          ]}
          // onModelChange={handleModelChange}
        />

      </div>
    );
  }
export default App;