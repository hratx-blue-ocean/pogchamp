import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from '@material-ui/core';
import TournamentHistory from './TournamentHistory/TournamentHistory.jsx';
import './OrganizerDashboard.css';
import './TournamentHistory/TournamentHistory.css';

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
    <div>
      <h2>Choose Tournament Style</h2>
      <FormControl style={{minWidth: 120}} variant="outlined" className="formControl">
        <InputLabel id="tournament style selector">Style</InputLabel>
        <Select
          labelId="tournament style"
          id="tournament style"
          value={tournamentStyle}
          onChange={handleTournamentStyleChange}
          label="Tournament Style"
          >
            <MenuItem value={"Bracket"}>Bracket</MenuItem>
            <MenuItem value={"Swiss"}>Swiss</MenuItem>
          </Select>
      </FormControl>
      <TournamentHistory />
    </div>
  );
}

export default OrganizerDashboard;

