import React from 'react';
import axios from 'axios';

const SideBar = (props) => {



  return (
    <div id='sideBar'>
      <Earners earners={props.topInfo.earners}/>
      <Winners winners={props.topInfo.winners}/>
      <Players players={props.topInfo.ratio}/>
    </div>
  )
}

const Earners = (props) => {
  return (
    <div id="earners" className="sideBarItem">
      <h2 className="sideBarHeader">Top five earners:</h2>
      <hr></hr>
      {props.earners.map((earner, i) => {
        return (
        <p key={i}>{earner.name}: ${earner.winnings}</p>
        )
      })}
    </div>
  )
}

const Winners = (props) => {
  return (
    <div id="winners" className="sideBarItem">
      <h2 className="sideBarHeader">Top Five Winners:</h2>
      <hr></hr>
      {props.winners.map((winner, i) => {
        return (
        <p key={i}>{winner.name}: {winner.wins}</p>
        )
      })}
    </div>
  )
}

const Players = (props) => {
  return (
    <div id="topplayers" className="sideBarItem">
      <h2 className="sideBarHeader">Top Five Players: W / L</h2>
      <hr></hr>
      {props.players.map((player, i) => {
        return (
        <p key={i}>{player.name}: {player.wins}/{player.losses}</p>
        )
      })}
    </div>
  )
}

const earners = [
  "Marty McFlarbnarb",
  "Dog McStuffins",
  "Peter Dinkalidge",
  "Toby Flenderson",
  "Mike Wizowski"
]

const winners = [
  "Vladamir Putin",
  "Bill Gates",
  "Elon Musk",
  "Couch McChairman",
  "Person Personson"
]

const players = [
  "Ron Swanson",
  "Michael Scott",
  "Ron Paul",
  "Leslie Knope",
  "Josh"
]

export default SideBar;