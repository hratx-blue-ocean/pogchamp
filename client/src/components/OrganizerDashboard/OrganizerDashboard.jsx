import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Button,
  Container
} from '@material-ui/core';
import TournamentHistory from './TournamentHistory/TournamentHistory.jsx';
import './OrganizerDashboard.css';
import './TournamentHistory/TournamentHistory.css';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

//PAGE ELEMENTS TO INCLUDE
// Organizer Avatar
// Create Tournament Selector
// Player stats (Wins/Losses, Total Tournaments Played, Total Earnings, Average Earnings)
// Organizer's Tournament History (Tournament Name, Game Name, Winner)

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

const OrganizerDashboard = (props) => {
  const classes = useStyles();
  const [tournamentStyle, setTournamentStyle] = useState('');

  const handleTournamentStyleChange = (event) => {
    setTournamentStyle(event.target.value);
  };

  return (
    <Container>
      <h2>Choose Tournament Style</h2>
      <Button variant="outlined" className="select-style"><Link to="/bracket">Bracket</Link></Button>
      <Button variant="outlined" className="select-style"><Link to="/swiss">Swiss</Link></Button>
      <TournamentHistory />
    </Container>
  );
}

export default OrganizerDashboard;

