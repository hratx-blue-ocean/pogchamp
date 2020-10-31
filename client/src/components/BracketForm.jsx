import React from 'react';

const BracketForm = () => {
  return (
    <div>
      <form>
        <label>
          Tournament Name:
          <input type="text" placeholder="enter tournament name"/>
        </label>

        <label>
          Game Name:
          <input type="text" placeholder="enter game name"/>
        </label>

        <label>
           Number of Players:
          <input type="text" placeholder="enter number of players"/>
        </label>

        <label>
          Player Names:
          <input type="text" placeholder="enter player names"/>
        </label>

        <label>
          Prize Amount:
          <input type="text" placeholder="enter prize amount"/>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default BracketForm;