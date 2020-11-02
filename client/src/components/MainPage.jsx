import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Grid, Paper } from '@material-ui/core';

const description = [
  {
    name: "Welcome to Pog Champ",
    description: "A tornament management system",
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
      <Carousel animation="slide" interval={6000}>
        {
          description.map((item, i) => <DescriptionItem key={i} item={item} />)
        }
      </Carousel>
      <hr />
      <Grid container className="tournaments">
        <Grid item xs={12} className="tournamentCarousel">
          <Carousel animation="slide" interval={10000}>
            <Grid container>
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
        {props.item.name}
        <p>{props.item.location}</p>
      </Paper>
    </Grid>
  )
}

export default MainPage;