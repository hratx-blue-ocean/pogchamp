import React, { useState, useEffect } from 'react';

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
    <form id="signup">
      <label>Select a username: </label>
      <input placeholder='username' onChange={e => {
        useData({...data,
          username: e.target.value
        })
      }
      }></input>
      <br />
      <label>Enter a password: </label>
      <input type="password" placeholder='password' onChange={e => {
        useData({...data,
          password: window.btoa(e.target.value)
        })
      }
      }></input>
      <br />
      <label>Retype password: </label>
      <input type="password" placeholder='password again'></input>
      <br />
      <label>Player or Organizer: </label><br />
      <input type="radio" id="Player" onChange={e => {
        useData({...data,
          type: "Player"
        })
      }
      } name="type" value="Player" />
      <label for="Player">Player</label><br />
      <input type="radio" name="type" id="Organizer" onChange={e => {
        useData({...data,
          type: "Organizer"
        })
      }
      } value="Organizer" />
      <label for="Organizer">Organizer</label>
      <br />
      <hr />
      <input type="submit"></input>
    </form>
  )
}

export default SignUp;