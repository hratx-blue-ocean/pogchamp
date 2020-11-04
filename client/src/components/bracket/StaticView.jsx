import React from 'react';
import { Grid, Tabs, Tab } from '@material-ui/core';

const StaticView = ( {changeView} ) => {
  //create newtournament, showmytournaments, liveview

  return (
    <React.Fragment>
    <Tabs
    value={false}
    style={{backgroundColor: "#e8e8e8"}}
    onChange={ (e, value) => { e.preventDefault(); changeView(value) }} 
    centered
    >
    <Tab label="Create New Tournament" value={"form"}/>
    <Tab label="Live-Tournament" value={"liveview"}/>

    
    </Tabs>
            
    </React.Fragment>
  )
}

export default StaticView;