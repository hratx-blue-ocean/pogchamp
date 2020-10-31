import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel'
// Navbar with login/register button + cool logo
// Left Sidebar that stays fixed
// Description
// Tournaments

const LandingPage = (props) => {
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
      name: "Tournament 1",
      location: "Buck's Game Shop"
    },
    {
      name: "Tournament 1",
      location: "Buck's Game Shop"
    },
    {
      name: "Tournament 1",
      location: "Buck's Game Shop"
    }
  ]

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center" id="container">
        <Grid item xs={12} className="navBar">
          <div id="navigation">
            <p id="logo">POG CHAMP</p>
            <a id="signup" href="">sign in/sign up</a>
          </div>
        </Grid>
        <Grid container>
          <Grid item xs={2} className="sideBar">
            <div id="sideBar">
              <div className="sideBarItem">
                Top 10 Earners
              </div>
              <div className="sideBarItem">
                Top 10 Most Recent Winners
              </div>
              <div className="sideBarItem">
                Top 10 Players
              </div>
              <div className="sideBarItem">
                Social Media
              </div>
            </div>
          </Grid>
          <Grid item xs={10} className="mainPage">
            <div id="landing">
              <Carousel animation="slide" interval={6000}>
                {
                  description.map((item, i) => <DescriptionItem key={i} item={item} />)
                }
              </Carousel>
              <hr />
              <Grid container className="tournaments">
                <Grid item xs={12} className="tournamentCarousel">
                  <Carousel animation="slide" interval={10000}>
                    {
                      tournaments.map((item, i) => <TournamentItem key={i} item={item} />)
                    }
                  </Carousel>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} className="footer">
          <span id="footer">footer</span>
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
    <Grid container>
      <Paper>
        <Grid item xs={6}>
          {props.item.name}
          <p>{props.item.location}</p>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default LandingPage;