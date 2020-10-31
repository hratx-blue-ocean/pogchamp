import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel'
// Navbar with login/register button + cool logo
// Left Sidebar that stays fixed
// Description
// Tournaments

const LandingPage = (props) => {
  const items = [
    {
        name: "Welcome to Pog Champ",
        description: "A tornament management system"
    },
    {
        name: "How to use the app",
        description: "Blah blah blah blah blah blah blah"
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
          <Grid item xs={3} className="sideBar">
            <div id="sideBar">
              sidebar
            </div>
          </Grid>
          <Grid item xs={9} className="mainPage">
            <div id="landing">
              main page
              <Carousel animation="slide">
                {
                  items.map((item, i) => <Item key={i} item={item} />)
                }
              </Carousel>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

function Item(props) {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>
    </Paper>
  )
}

export default LandingPage;