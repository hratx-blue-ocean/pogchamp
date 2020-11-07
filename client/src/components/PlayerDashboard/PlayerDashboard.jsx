import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
  Container,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import './PlayerDashboard.css';
import PlayerTournamentHistory from './PlayerTournamentHistory/PlayerTournamentHistory.jsx';
// import { CompassCalibrationOutlined } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  username: {
    textAlign: 'center'
  },
  media: {
    height: 140,
  },
});

// let userData = {};
console.log("Reloading this Script");

const PlayerDashboard = () => {
  const [userData, setUp] = useState({})
  useEffect(() => {
    console.log('Getting user dashboard information');
    getUserData()
  }, []);
  const classes = useStyles();

  //Player Information reveived
  // console.log('player dashboard')
  
  const getUserData = () => {
    axios.get('/dashboard/player')
    .then((res) => {
      console.log('Player data', res.data);
      setUp(res.data);
    })
    .catch((err)=> {
      console.log('Error geting player data', err)
    })
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="https://cdn.gamer-network.net/2019/usgamer/Smash-Ultimate-Header-10.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/super-smash-bros-ultimate-review-12072018.jpg"
                title="Super Smash Bros"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" className={classes.username}>
                  {userData.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" className={classes.username}>
              {userData.name}'s Stats
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                Total Wins: {userData.wins}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                Total Losses: {userData.losses}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                Total Earnings: ${userData.winnings}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card className={classes.root}>

            {userData.name ? 
              <CardContent>
                <h2>Upcoming Tournaments</h2>
                {userData.upcoming.map((tournament, index) => 
                  <Typography key={index} gutterBottom variant="h5" component="h2">
                    {tournament.name} {tournament.date} {tournament.location}
                  </Typography>
                )}
              </CardContent>
            : null }
          </Card>
        </Grid>
      </Grid>
      <PlayerTournamentHistory userData={userData}/>
    </Container>
  );
}

export default PlayerDashboard;