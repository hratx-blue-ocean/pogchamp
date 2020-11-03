import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
// import Title from './Title';

// Generate Order Data
const createData = (id, game, date, location, cityAndState, style, result) => {
  return { id, game, date, location, cityAndState, style , result};
}

const rows = [
  createData(0, 'Magic, The Gathering', '16 Mar, 2019', 'Dragon\'s Lair', 'Austin, TX', 'Swiss', 'Win'),
  createData(1, 'Team Fortress 2', '07 Apr, 2019', 'Mothership Games', 'Austin, TX', 'Bracket', 'Win'),
  createData(2, 'Starcraft 2', '12 Aug, 2019', 'Mage\'s Sanctum', 'Austin, TX', 'Swiss', 'Win'),
  createData(3, 'Warhammer 40k', '16 Mar, 2019', 'Dragon\'s Lair', 'Austin, TX', 'Bracket', 'Win'),
  createData(4, 'Super Smash Bros', '16 Mar, 2019', 'Josh\'s Couch', 'Austin, TX', 'Swiss', 'Win'),
];

const preventDefault = (event) => {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const PlayerTournamentHistory = (props) => {
  const [playerName, setPlayerName] = useState('Grantalf');
  const classes = useStyles();
  return (
    <React.Fragment>
      {/* replace h2's with Title later */}
      <h2>{playerName}'s Tournament History</h2>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Game</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>City/State</TableCell>
            <TableCell>Tournament Style</TableCell>
            <TableCell align="right">Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.game}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.cityAndState}</TableCell>
              <TableCell>{row.style}</TableCell>
              <TableCell align="right">{row.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more tournaments
        </Link>
      </div>
    </React.Fragment>
  );
}

export default PlayerTournamentHistory;