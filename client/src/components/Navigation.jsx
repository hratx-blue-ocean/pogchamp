import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../PogChamp.png';

const NavBar = ({ handleLogin }) => {
  return (
    <div id="navigation" className="navBar">
        <Link to="/"><img id="logo" height={"50px"} src={Logo} /></Link>
        <button id="signup" onClick={() => handleLogin(true)}>sign in/sign up</button>
    </div>
  )
}

export default NavBar;