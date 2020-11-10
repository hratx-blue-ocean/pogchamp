import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Grid, Paper } from '@material-ui/core';

const description = [
  {
    name: "Expwnent: Up Your Game",
    description: "Battle in your favorite games to determine the champion!",
    url: "https://nexus.leagueoflegends.com/wp-content/uploads/2019/06/Banner_T2_Image_tnp3w61gzna8r2n3rojp.jpg"
  },
  {
    name: "Organize Your Own Tournament",
    description: "Choose between Bracket or Swiss tournament styles",
    url: "https://blog.playstation.com/tachyon/2019/11/ow2-featured.jpg?resize=1088,612&crop_strategy=smart&zoom=1"
  },
  {
    name: "Unleash the Winner in You",
    description: "Do you have what it takes to reach the final match?",
    url: "https://cdn.gamer-network.net/2019/usgamer/Smash-Ultimate-Header-10.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/super-smash-bros-ultimate-review-12072018.jpg"
  }
]

const tournaments = [
  {
    name: "Scrabble",
    location: "Buck's Game Shop"
  },
  {
    name: "LoL - Winter Split",
    location: "Card Den"
  },
  {
    name: "Smash Championship",
    location: "Josh's Basement"
  },
  {
    name: "Magic the Gathering",
    location: "Zilker Park"
  },
  {
    name: "Hearthstone",
    location: "Buck's Game Shop"
  },
  {
    name: "Poker",
    location: "Card Den"
  },
  {
    name: "???",
    location: "Josh's Basement"
  },
  {
    name: "Among Us",
    location: "Discord"
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
        <Grid item xs={12} id='carouselText'>
          <div className="carousel-inner-text">
            <h4>{props.item.name}</h4>
            <p>{props.item.description}</p>
          </div>
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
          <h5>{props.item.name}</h5>
          <p>{props.item.location}</p>
        </div>
      </Paper>
    </Grid>
  )
}

export default MainPage;