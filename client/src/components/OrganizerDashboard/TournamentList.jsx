import React, { useState, useEffect } from 'react';
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
  CardContent,
  Tooltip
} from "@material-ui/core";
import LiveTournament from '../bracket/LiveTournament.jsx';

const iframeoptions = '?show_tournament_name=1&show_final_results=1&show_standings=1&scale_to_fit=1';

class tournamentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizerData: false,
      hostName: props.hostName,
      live_image_url: false,
      tournamentId: false,
      prizeAmount: false,
      registerOrStart: false,
      winners: false,
      players: false,
      showIframe: false,
      winners: { "first": {}, "second": {}, "third": [] },
    }
    this.startMatch = this.startMatch.bind(this);
  }

  componentWillMount() {
    this.getOrganizer();
  };

  getOrganizer() {
    axios.get(`/api/organizerData/?hostName=${this.state.hostName}`)
      .then(results => {
        this.setOrganizersTourn(0, results.data);
        console.log(results.data);
        this.setState({
          organizerData: results.data
        })
      })
      .catch(error => {
        console.log(error);
      })
  };

  setOrganizersTourn(index, data) {
    let prize = {
      first: Math.floor(data[index].totalPrize * .50),
      second: Math.floor(data[index].totalPrize * .30),
      third: Math.floor(data[index].totalPrize * .20),
    };
    let players = [];
    let registerOrStart = "start";
    data[index].registered.map((x) => {
      players.push({participant: { id: x.id, name: x.name, challongeId: x.challongeId[`${data[index].tournamentId}`].id }});
    })
    if (data[index].status === "pending") {
      registerOrStart = "register";
    }
    console.log(players);
    this.setState({
      tournamentId: data[index].tournamentId,
      prizeAmount: prize,
      players: players,
      live_image_url: data[index].Url,
      registerOrStart: registerOrStart,
      showIframe: true,
    })
  };

  participantNameList() {
    return (
      this.state.players.map((player, index) => {
        return <Grid item xs={3} key={index}>
          <Tooltip
            title={
              <React.Fragment>
                <Typography color="inherit">player information</Typography>
              </React.Fragment>
            }
          >
            <Button onClick={() => { this.updateMatchWinner(player.participant.challongeId) }} fullWidth>{player.participant.name}</Button>
          </Tooltip>
        </Grid>
      })
    )
  };


  startMatch() {
    axios.post("/api/startTournament", { tournamentId: this.state.tournamentId })
      .then((res) => {
        this.setState({ showIframe: true })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateMatchWinner(id = null) {
    axios.post(`/api/updateMatch`, {
      tournament_id: this.state.tournamentId,
      participant_id: id,
    })
      .then((res) => {
        let deletePlayer = res.data.loserId;
        console.log(deletePlayer);
        let players = this.state.players;
        let winnersObj = this.state.winners;
        if (players.length === 3 || players.length === 2 ||
          players.length === 4) {
          let playerObj = players.find((player) =>
            player.participant.challongeId === deletePlayer);
          if (players.length === 2) {
            winnersObj["second"] = playerObj;
          } else {
            winnersObj["third"] = [...this.state.winners.third, playerObj];
          }
          this.setState({ winners: winnersObj });
        }
        console.log("Nothing broke so far");

        let filteredPlayers = players.filter(function (
          player
        ) {
          return player.participant.challongeId !== deletePlayer;
        });
        if (filteredPlayers.length === 1) {
          let firstPlace = filteredPlayers[0];
          winnersObj["first"] = firstPlace;
          this.finalizeTournament();
          this.setState({ players: filteredPlayers, showIframe: false, winners: winnersObj });
        } else {
          this.setState({
            players: filteredPlayers,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  finalizeTournament() {
    let id = this.state.tournamentId;
    axios.put('/api/finalizeTournament', { "tournamentId": id })
      .then((res) => {
        // console.log("Finalized tournament");
        this.setState({ showIframe: true }, () => {
          console.log(this.state.winners, this.state.prizeAmount, "new");
        })
      })
      .then(() => {
        let money = this.state.prizeAmount;
        let winnings = {};
        console.log(this.state.winners);
        winnings[this.state.winners.first.participant.name] = money.first;
        winnings[this.state.winners.second.participant.name] = money.second;
        winnings[this.state.winners.third[0].participant.name] = money.third;

        axios.post('/api/declareWinner', { tournamentId: this.state.tournamentId, username: this.state.players[0].participant.name, winnings: winnings })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log("error:", err);
      })
  }


  TournamentMap() {
    return (
      <Grid container item xs={3}>
        {this.state.organizerData.map((x, i) => {
          return <Grid item xs={12} style={{ padding: 20 }}>
            <Card style={{ maxWidth: 300 }}>
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
                <Button size="small" color="textSecondary" onClick={() => { this.setOrganizersTourn(i, this.state.organizerData) }}>View Tournament</Button>
              </CardActions>
            </Card>
          </Grid>
        })}
      </Grid>
    )
  };

  render() {
    return (
      <div>
        <Grid container>
          {this.state.organizerData ? this.TournamentMap() : null}
          <Grid container item xs={9}>
            <LiveTournament players={this.state.players} prizes={this.state.prizeAmount}
              winners={this.state.winners} live_image_url={this.state.live_image_url} registerOrStart={this.state.registerOrStart} startMatch={this.startMatch} hostName={this.state.hostName} />

            {this.state.players.length > 1 ? (

              <Grid container item xs={6} direction="row">
                {this.participantNameList()}
              </Grid>

            ) : null}
            {this.state.showIframe && this.state.live_image_url ? (
              <iframe
                src={`http://challonge.com/${this.state.live_image_url}/module${iframeoptions}`}
                width="95%"
                height="550"
                frameBorder="0"
                scrolling="auto"
              ></iframe>
            ) : null}
          </Grid>
        </Grid>
      </div >
    )
  }
}

export default tournamentList;