import React from 'react';

const SideBar = () => {
  return (
    <div id='sideBar'>
      <Earners />
      <Winners />
      <Players />
    </div>
  )
}

const Earners = () => {
  return (
    <div id="earners" className="sideBarItem">
      earners
    </div>
  )
}

const Winners = () => {
  return (
    <div id="winners" className="sideBarItem">
      winners
    </div>
  )
}

const Players = () => {
  return (
    <div id="topplayers" className="sideBarItem">
      players
    </div>
  )
}

export default SideBar;