import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Grid, Paper } from '@material-ui/core';

const description = [
  {
    name: "Welcome to Pog Champ",
    description: "Create and manage tournaments between you and your friends! Supports Bracket pairings and Swiss Pair tournaments.",
    url: "https://nexus.leagueoflegends.com/wp-content/uploads/2019/06/Banner_T2_Image_tnp3w61gzna8r2n3rojp.jpg"
  },
  {
    name: "How to use the app",
    description: "Blah blah blah blah blah blah blah",
    url: "https://blog.playstation.com/tachyon/2019/11/ow2-featured.jpg?resize=1088,612&crop_strategy=smart&zoom=1"
  },
  {
    name: "How to use the app",
    description: "Blah blah blah blah blah blah blah",
    url: "https://cdn.gamer-network.net/2019/usgamer/Smash-Ultimate-Header-10.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/super-smash-bros-ultimate-review-12072018.jpg"
  }
]

const tournaments = [
  {
    name: "Tournament 1",
    location: "Buck's Game Shop"
  },
  {
    name: "Tournament 2",
    location: "Card Den"
  },
  {
    name: "Tournament 3",
    location: "Josh's Basement"
  },
  {
    name: "Tournament 4",
    location: "HR - Senior Open Classroom"
  },
  {
    name: "Tournament 5",
    location: "Buck's Game Shop"
  },
  {
    name: "Tournament 6",
    location: "Card Den"
  },
  {
    name: "Tournament 7",
    location: "Josh's Basement"
  },
  {
    name: "Tournament 8",
    location: "HR - Senior Open Classroom"
  }
]

const MainPage = (props) => {
  return (
    <div>
      <Grid container className="Description">
        <Grid item xs={12} >
          <Carousel animation="slide" interval={6000}>
            {
              description.map((item, i) => <DescriptionItem key={i} item={item} />)
            }
          </Carousel>
        </Grid>
      </Grid>
      <hr />
      <Grid container className="tournaments">
        <Grid item xs={12} spacing={1} className="tournamentCarousel">
          <Carousel animation="slide" interval={10000}>
            <Grid container spacing={1}>
              {
                tournaments.map((item, i) => <TournamentItem key={i} item={item} />)
              }
            </Grid>
          </Carousel>
        </Grid>
      </Grid>

    </div>
  )
}

function DescriptionItem(props) {
  return (
    <Grid container className="carouselItem" style={{ "backgroundImage": props.item.url }}>
      <Paper>
        <Grid item xs={5} id='carouselText'>
          {props.item.name}
          <p>{props.item.description}</p>
        </Grid>
        <img className="carouselImg" src={props.item.url} />
      </Paper>
    </Grid>
  )
}

function TournamentItem(props) {
  return (
    <Grid item xs={3}>
      <Paper>
        <div className="TournamentPaper">
          {props.item.name}
          <p>{props.item.location}</p>
        </div>
      </Paper>
    </Grid>
  )
}

export default MainPage;