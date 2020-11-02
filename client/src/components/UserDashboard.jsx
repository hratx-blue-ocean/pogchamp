import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//PAGE ELEMENTS
// Player Avatar
// Create Tournament Selector
// Player stats (Wins/Losses, Total Tournaments Played, Total Earnings, Average Earnings)
// Player Tournament History (Tournament Name, Game Name, W or L)
// Nearby/Upcoming Tournaments Viewer

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const UserDashboard = (props) => {
  const classes = useStyles();
  const [tournamentStyle, setTournamentStyle] = useState('');

  const handleTournamentStyleChange = (event) => {
    setTournamentStyle(event.target.value);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="tournament style selector">Select Tournament Style</InputLabel>
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
    </div>

  )
}

export default UserDashboard;