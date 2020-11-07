import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../EXPWNENT.png';
import { Button } from '@material-ui/core';

const NavBar = ({ handleLogin }) => {
  return (
    <div id="navigation" className="navBar">
        <Link to="/"><img id="logo" height={"50px"} src={Logo} /></Link>
        <Button id="signinButton" onClick={() => handleLogin(true)} variant="contained">sign in/sign up</Button>
    </div>
  )
}

export default NavBar;