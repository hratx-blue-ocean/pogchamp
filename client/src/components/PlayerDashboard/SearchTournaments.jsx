import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  Grid,
  FormControl,
  TextField,
  Typography,
  Card,
  CardActions,
  CardContent
} from "@material-ui/core";

const MapTourns = (props) => {
  return (
    <Grid container>
      {props.openTournaments.map((x) => {
        return <Grid item xs={4} style={{ padding: 20 }}>
          <Card style={{ maxWidth: 400 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {x.name}
              </Typography>
              <Typography variant="h5" component="h2">
                {x.gameName}
              </Typography>
              <Typography color="textSecondary">
                {x.totalPrize}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {x.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {x.type}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="textSecondary" onClick={() => {
                axios.post("/api/postOneParticipant", { participants: [{ name: props.fakeUserName }], tournamentId: x.tournamentId })
                  .then((data) => {
                    console.log(data.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              }}>Sign Up</Button>
            </CardActions>
          </Card>
        </Grid>
      })}
    </Grid>
  )
}

const SearchTournaments = (props) => {
  const [openTournaments, setOpenTournaments] = useState(false);
  const [stop, setStop] = useState(0);
  const tournaments = useRef(null);
  const [repeat, setRepeat] = useState(false);

  const handleTournaments = (e) => {
    e.preventDefault();

    let incomingTournament = tournaments.current.value;
    axios.get(`/api/searchedOpen/?search=${incomingTournament}`)
      .then((data) => {
        if (data.data === "") {
          setRepeat("Tournament Not Found")
        } else {
          setOpenTournaments(data.data);
          setRepeat("");
        }
      })
      .catch((err) => {
        setRepeat("Tournament Not Found")
      })
    tournaments.current.value = "";
  };
  //way around componentDidMount()
  useEffect(() => {
    findOpen();
  }, [stop]);

  const findOpen = () => {
    axios.get('/api/openTournaments')
      .then(results => {
        console.log(results.data);
        setOpenTournaments(results.data)
      })
      .catch(error => {
        console.log(error);
      })
  };
  return (
    <div>
      <form
        autoComplete="off"
        onSubmit={handleTournaments}
        className="setup-form"
      >
        <Typography variant="subtitle2" style={{ color: "red" }}>{repeat}</Typography>
        <TextField
          required
          label="Search Tournaments"
          variant="filled"
          size="medium"
          inputRef={tournaments}
        />
        <Button type="submit" variant="contained">
          Search
        </Button>
      </form>
      {openTournaments ? <MapTourns openTournaments={openTournaments} fakeUserName={props.fakeUserName} /> : null}
    </div>
  )
};

export default SearchTournaments;