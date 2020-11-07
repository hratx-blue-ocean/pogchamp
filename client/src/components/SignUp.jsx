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
        {/* <label>Select a username: </label> */}
        <TextField
          onChange={e => {
            useData({...data,
              username: e.target.value
            })
          }}
          size="small"
          label="Select a username"
          variant="filled" />

        {/* <input placeholder='username' onChange={e => {
          useData({...data,
          username: e.target.value
          })}
        }></input> */}
        <br />
        {/* <label>Enter a password: </label> */}
        {/* <input type="password" placeholder='password' onChange={e => {
          useData({...data,
          password: window.btoa(e.target.value)
          })}}></input> */}
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
        {/* <label>Retype password: </label>
        <input type="password" placeholder='password again'></input> */}
        <TextField
          type="password"
          size="small"
          label="Retype password"
          variant="filled" />
        <br />

        <label>Player or Organizer: </label><br />
        {/*
        <input
          type="radio"
          id="Player"
          onChange={e => {
            useData({...data,
              type: "Player"
            })}}
          name="type"
          value="Player" />
        <label for="Player">Player</label><br />

        <input
          type="radio"
          name="type"
          id="Organizer"
          onChange={e => {
            useData({...data,
              type: "Organizer"
            })}}
          value="Organizer" />
        <label for="Organizer">Organizer</label> */}

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