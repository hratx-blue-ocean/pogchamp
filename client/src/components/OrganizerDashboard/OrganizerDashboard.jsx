import React, { useEffect, useState } from 'react';
import {
  Button,
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
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import TournamentHistory from './TournamentHistory/TournamentHistory.jsx';
import './OrganizerDashboard.css';
import './TournamentHistory/TournamentHistory.css';
import axios from 'axios';

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
  username: {
    textAlign: "center",
  }
}));

const OrganizerDashboard = (props) => {
  const [userData, setUserData] = useState({});
  const [tournamentStyle, setTournamentStyle] = useState('');
  useEffect(() => {
    getUserData();
  }, [])

  const classes = useStyles();

  const handleTournamentStyleChange = (event) => {
    setTournamentStyle(event.target.value);
  };

  const getUserData = () => {
    axios.get('/dashboard/player')
    .then((res) => {
      console.log('Getting Organizer data from DB');
      setUserData(res.data);
    })
    .catch((err)=> {
      console.log('Error geting organizer data', err)
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
                  {userData.name ? userData.name : null}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" className={classes.username}>
                Tournament Selector
              </Typography>
              <CardActions  variant="h5" component="h2">
                <Button variant="outlined" className="select-style"><Link to="/bracket">Bracket</Link></Button>
                <Button variant="outlined" className="select-style"><Link to="/swiss">Swiss</Link></Button>
              </CardActions>
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
      <TournamentHistory userData={userData}/>
    </Container>
  );
}

export default OrganizerDashboard;