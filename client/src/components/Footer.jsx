import React from 'react';
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const Footer = () => {
  return (
    <div id="footer">
      <Button>
        <FacebookIcon fontSize="medium"/>
      </Button>
      <Button>
        <InstagramIcon fontSize="medium"/>
      </Button>
      <Button>
        <TwitterIcon fontSize="medium"/>
      </Button>
    </div>
  )
}

export default Footer;