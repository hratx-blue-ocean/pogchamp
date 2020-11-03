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
      <h2>Top five earners:</h2>
      <hr></hr>
      {earners.map(earner => {
        return (
          <p>{earner}</p>
        )
      })}
    </div>
  )
}

const Winners = () => {
  return (
    <div id="winners" className="sideBarItem">
      <h2>Top Five Winners:</h2>
      <hr></hr>
      {winners.map(winner => {
        return (
          <p>{winner}</p>
        )
      })}
    </div>
  )
}

const Players = () => {
  return (
    <div id="topplayers" className="sideBarItem">
      <h2>Top Five Players:</h2>
      <hr></hr>
      {players.map(player => {
        return (
          <p>{player}</p>
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