import React, {useState, useEffect} from 'react';
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//tournament name, game, date, location, city/state, type, outcome
// const rows = [
//   createData(0, 'Magic, The Gathering', '16 Mar, 2019', 'Dragon\'s Lair', 'Austin, TX', 'Swiss', 'Win'),
//   createData(1, 'Team Fortress 2', '07 Apr, 2019', 'Mothership Games', 'Austin, TX', 'Bracket', 'Win'),
//   createData(2, 'Starcraft 2', '12 Aug, 2019', 'Mage\'s Sanctum', 'Austin, TX', 'Swiss', 'Win'),
//   createData(3, 'Warhammer 40k', '16 Mar, 2019', 'Dragon\'s Lair', 'Austin, TX', 'Bracket', 'Win'),
//   createData(4, 'Super Smash Bros', '16 Mar, 2019', 'Josh\'s Couch', 'Austin, TX', 'Swiss', 'Win'),
// ];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const PlayerTournamentHistory = ({userData}) => {
  console.log('props:', userData);

  const [playerName, setPlayerName] = useState('rapwnzel');
  const classes = useStyles();

  return (
    <React.Fragment>
      <h2 className="title">{userData.name}'s Tournament History</h2>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tournament</TableCell>
            <TableCell>Game</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Tournament Style</TableCell>
            <TableCell align="right">Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.name ? userData.attended.map((tournament, index) =>
            <TableRow key={index}>
              <TableCell>{tournament.name}</TableCell>
              <TableCell>{tournament.game}</TableCell>
              <TableCell>{tournament.date}</TableCell>
              <TableCell>{tournament.location}</TableCell>
              <TableCell>{tournament.type}</TableCell>
              <TableCell align="right">{tournament.result ? "Won" : "Lost"}</TableCell>
            </TableRow>
          )
          : null}
        </TableBody>
      </Table>

      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={(e) => {e.preventDefault()}}>
          See more tournaments
        </Link>
      </div>
    </React.Fragment>
  );
}

export default PlayerTournamentHistory;