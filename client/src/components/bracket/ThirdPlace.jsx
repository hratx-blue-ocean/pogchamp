import React, {useState} from 'react';
import { Button } from '@material-ui/core';

function ThirdPlace({third_place}) {
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);

  let nameone = third_place[0]["participant"]["name"];
  let nametwo = third_place[1]["participant"]["name"];
  const onPick = (name) => {
    if (name === nameone) {
      setTwo(true);
    } else {
      setOne(true);
    }
  }
  return (
    <React.Fragment>
    <div>
      <h4>Third Place Winner?</h4>
      <Button style={{backgroundColor: "orange", border: 10}} disabled={one} onClick={() => onPick(nameone)}>{nameone}</Button>
      <Button style={{backgroundColor: "orange", border: 10}} disabled={two} onClick={() => onPick(nametwo)}>{nametwo}</Button>
    </div>
    </React.Fragment>
  );
}

export default ThirdPlace;