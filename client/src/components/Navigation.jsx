import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = ({handleLogin}) => {
  return (
    <div id="navigation">
      <Link to="/"><p id="logo">POG CHAMP</p></Link>
      <button id="signup" onClick={() => handleLogin(true)}>sign in/sign up</button>
    </div>
  )
}

export default NavBar;