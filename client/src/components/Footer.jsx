import React from 'react';
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const Footer = () => {
  return (
    <div id="footer">
      <Button>
        <FacebookIcon fontSize="default"/>
      </Button>
      <Button>
        <InstagramIcon fontSize="default"/>
      </Button>
      <Button>
        <TwitterIcon fontSize="default"/>
      </Button>
    </div>
  )
}

export default Footer;