import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import './PlayerDashboard.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const PlayerDashboard = () => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://cdn.gamer-network.net/2019/usgamer/Smash-Ultimate-Header-10.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/super-smash-bros-ultimate-review-12072018.jpg"
            title="Super Smash Bros"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Grantalf
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Wins/Losses: 23,945/0
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Tournament History
          </Button>
          <Button size="small" color="primary">
            Upcoming Tournaments
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default PlayerDashboard;