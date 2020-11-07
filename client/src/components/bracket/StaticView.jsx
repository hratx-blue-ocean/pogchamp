import React from 'react';
import {
  Grid,
  Tab,
  Tabs
} from '@material-ui/core';

const StaticView = ( {changeView} ) => {
  return (
    <React.Fragment>
    <Tabs
    value={false}
    style={{backgroundColor: "#e8e8e8"}}
    onChange={ (e, value) => { e.preventDefault(); changeView(value) }}
    centered
    >
    <Tab label="Create New Tournament" value={"form"}/>
    <Tab label="Bracket View" value={"liveview"}/>
    </Tabs>
    </React.Fragment>
  )
}

export default StaticView;