import React from 'react';
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const TournamentHistory = ({userData}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <h2 className="title">Hosted Tournaments</h2>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tournament</TableCell>
            <TableCell>Game</TableCell>
            <TableCell>Tournament Style</TableCell>
            <TableCell align="right">Winner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {userData.name ? userData.attended.map((tournament, index) =>
          <TableRow key={index}>
            <TableCell>{tournament.name}</TableCell>
            <TableCell>{tournament.game}</TableCell>
            <TableCell>{tournament.type}</TableCell>
            <TableCell align="right">{tournament.winner ? tournament.winner : "unknown"}</TableCell>
          </TableRow>
        )
        : null}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={(e) => {e.preventDefault(); console.log('Clicked once')} }>
          See more tournaments
        </Link>
      </div>
    </React.Fragment>
  );
}

export default TournamentHistory;