import React from 'react';
import { Grid, Tabs, Tab } from '@material-ui/core';

const StaticView = ( {changeView} ) => {
  //create newtournament, showmytournaments
  console.log('staticView showing');

  return (
    <React.Fragment>
    <Tabs
    value={false}
    style={{backgroundColor: "#7a857f"}}
    onChange={ (e, value) => { e.preventDefault(); changeView(value) }} 
    centered
    >
    <Tab label="Create New Tournament" />
    <Tab label="My Tournaments" />
    
    </Tabs>
            
    </React.Fragment>
  )
}

export default StaticView;