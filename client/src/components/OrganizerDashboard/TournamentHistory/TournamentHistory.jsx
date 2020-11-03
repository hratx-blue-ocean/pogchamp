import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Title from './Title';

// Generate Order Data
 const createData = (id, game, date, location, cityAndState, style) => {
  return { id, game, date, location, cityAndState, style };
}

const rows = [
  createData(0, 'Magic, The Gathering', '16 Mar, 2019', 'Dragon\'s Lair', 'Austin, TX', 'Swiss'),
  createData(1, 'Team Fortress 2', '07 Apr, 2019', 'Mothership Games', 'Austin, TX', 'Bracket'),
  createData(2, 'Starcraft 2', '12 Aug, 2019', 'Mage\'s Sanctum', 'Austin, TX', 'Swiss'),
  createData(3, 'Warhammer 40k', '16 Mar, 2019', 'Dragon\'s Lair', 'Austin, TX', 'Bracket'),
  createData(4, 'Super Smash Bros', '16 Mar, 2019', 'Josh\'s Couch', 'Austin, TX', 'Swiss'),
];

const preventDefault = (event) => {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const TournamentHistory = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {/* replace h2's with Title later */}
      <h2>Tournament History</h2>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Game</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>City/State</TableCell>
            <TableCell align="right">Tournament Style</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.game}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.cityAndState}</TableCell>
              <TableCell align="right">{row.style}</TableCell>
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

export default TournamentHistory;