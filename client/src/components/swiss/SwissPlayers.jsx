import React, { useRef } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const SwissPlayers = (props) => {
  const score = useRef('0');
  let listRefs = new Map();

  const handleScoreUpdate = (e, player) => {
    e.preventDefault();
    let currentScore = Number(listRefs.get(player).current.value);
    if(currentScore) {
      let newScore = props.playerInfo[player] + currentScore;
      props.setPlayerInfo({...props.playerInfo, [player]: newScore});
    }
    props.setCurrentRoundScores({...props.currentRoundScores, [player]: currentScore})
    listRefs.get(player).current.value = '';
  }

  return (
    <div>
    {
      props.playerInfo === {}
        ? ''
        : <div>
          <h4>Players:</h4>
            {Object.keys(props.playerInfo).map((player, index) => {
              listRefs.set(player, React.createRef())
              return (
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  key={index}
                  className={player.toLowerCase() === 'bye'
                    ? "swiss-player bye-player"
                    : "swiss-player"}
                >
                <Grid item sm={3}>
                  <p>{player} - {props.playerInfo[player]}</p>
                </Grid>
                <Grid item sm={5}>
                  <TableContainer>
                    <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Rounds</TableCell>
                        { props.roundWinners[player].map((round, index) => {
                          return <TableCell align="center">{index + 1}</TableCell>
                        })}
                      </TableRow>
                    </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Wins/Losses
                          </TableCell>
                          { props.roundWinners[player].map((round, index) => {
                            return round === true
                              ? <TableCell align="center"><CheckCircleOutlineIcon className="won"/></TableCell>
                              : <TableCell align="center"><NotInterestedIcon className="lost"/></TableCell>
                          })}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item sm={4} align="right">
                  {
                    player.toLowerCase() === 'bye'
                      ? ''
                      : <form onSubmit={(e) => handleScoreUpdate(e, player)}>
<<<<<<< HEAD
                          <TextField
                            label="Score"
                            type="text"
=======
                          {/* <TextField label="add to score" variant="outlined" size="small" inputRef={listRefs.get(player)} /> */}
                          <TextField
                            label="Score"
                            type="number"
>>>>>>> main
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputRef={listRefs.get(player)}
                          />
                          <Button
                            className="submit-score"
                            color="primary"
                            type="submit"
<<<<<<< HEAD
                            size="small"
                            variant="outlined">add to score</Button>
=======
                            size="small">add to score</Button>
>>>>>>> main
                        </form>
                  }
                </Grid>
                </Grid>
              )
            })}
            {
              props.gameDetails.currentRound > 0 && props.gameDetails.currentRound !== (parseInt(props.gameDetails.rounds) + 1)
                ? <Button onClick={props.handlePairings}
                    variant="outlined"
                    className="round-progress">
                    Round {props.gameDetails.currentRound} scoring complete</Button>
                : ''
            }

          </div>
    }
    </div>
  )
}

export default SwissPlayers;