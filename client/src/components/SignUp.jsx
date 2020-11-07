import React, { useState, useEffect } from 'react';
import { Container, TextField, Radio, RadioGroup, FormControlLabel, Button } from '@material-ui/core';

const SignUp = ({ handleModal }) => {
  handleModal(false);

  const [data, useData] = useState({
    username: "",
    password: "",
    type: ""
  }, () => {
    console.log(data);
  })

  useEffect(() => {
    console.log(data);
    //
  })

  return (
    <Container maxWidth="sm" className="signup-form-container">
      <h2>Sign up</h2>
      <form id="signup">
        <TextField
          onChange={e => {
            useData({...data,
              username: e.target.value
            })
          }}
          size="small"
          label="Select a username"
          variant="filled" />
        <br />
        <TextField
          type="password"
          onChange={e => {
            useData({...data,
              password: window.btoa(e.target.value)
            })
          }
          }
          size="small"
          label="Enter a password"
          variant="filled" />
        <br />
        <TextField
          type="password"
          size="small"
          label="Retype password"
          variant="filled" />
        <br />

        <label>Player or Organizer: </label><br />

        <RadioGroup aria-label="type" name="type">
          <FormControlLabel
            value="Player"
            control={<Radio />}
            label="Player"
            onChange={e => {
              useData({...data,
                type: "Player"
              })}}
          />
          <FormControlLabel
            value="Organizer"
            control={<Radio />}
            label="Organizer"
            onChange={e => {
              useData({...data,
                type: "Organizer"
              })}}
          />
        </RadioGroup>
        <br />
        <hr />
        <Button type="submit" variant="contained">Submit</Button>
      </form>
    </Container>
  )
}

export default SignUp;