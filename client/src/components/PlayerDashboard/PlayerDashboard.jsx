import React, { useState, useEffect } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PlayerTournamentHistory from './PlayerTournamentHistory/PlayerTournamentHistory.jsx';
import './PlayerDashboard.css';
import axios from 'axios';

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

const PlayerDashboard = () => {
  const [userData, setUp] = useState({
    "name" : "rapwnzel",
    "attended": [{
      "name" : "My Previous Tournament",
      "prize" : "200",
      "date": "09/15/2020",
      "game":  "Minecraft",
      "location" : "Houston basement",
      "type": "Bracket"
    },
    {
      "name" : "Super Fun Tournament",
      "prize" : "100",
      "date": "10/25/2020",
      "game":  "Magic the Gathering",
      "location" : "The Shop",
      "type": "Swiss",
      "result": true
    }],
    "upcoming" : [{
      "name":"Smash Tournament",
      "date": "11/13/2020",
      "location": "Josh's backyard"
    }],
    "wins": 420,
    "losses": 1,
    "winnings": 1000
  })

  // useEffect(() => {
  //   console.log('Getting user dashboard information');
  //   getUserData()
  // }, []);
  const classes = useStyles();

  // const getUserData = () => {
  //   axios.get('/dashboard/player')
  //   .then((res) => {
  //     console.log('Getting Player data from DB');
  //     setUp(res.data);
  //   })
  //   .catch((err)=> {
  //     console.log('Error geting player data', err)
  //   })
  // }

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
                  {userData.name ? userData.name : null }
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" className={classes.username}>
              {userData.name ? userData.name : null}'s Stats
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                Total Wins: {userData.wins ? userData.wins : null}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                Total Losses: {userData.losses ? userData.losses : null}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                Total Earnings: ${userData.winnings ? userData.winnings : null}
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
                    {tournament.name ? tournament.name : null} {tournament.date ? tournament.date : null} {tournament.location ? tournament.location : null}
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