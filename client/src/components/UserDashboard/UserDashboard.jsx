import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, MenuItem, FormHelperText, FormControl, Select } from '@material-ui/core';
import './UserDashboard.css';

//PAGE ELEMENTS TO INCLUDE
// Player Avatar
// Create Tournament Selector
// Player stats (Wins/Losses, Total Tournaments Played, Total Earnings, Average Earnings)
// Player Tournament History (Tournament Name, Game Name, W or L)
// Nearby/Upcoming Tournaments Viewer

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

const UserDashboard = (props) => {
  // const classes = useStyles();
  const [tournamentStyle, setTournamentStyle] = useState('');

  const handleTournamentStyleChange = (event) => {
    setTournamentStyle(event.target.value);
  };

  return (
    <div>
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
    </div>
  );
}

export default UserDashboard;