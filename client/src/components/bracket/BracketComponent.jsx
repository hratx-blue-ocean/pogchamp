import React from "react";
import axios from "axios";
import { Container, Grid, Button, Tooltip, Typography } from '@material-ui/core';

import BracketForm from './BracketForm.jsx';
import StaticView from './StaticView.jsx';
import LiveTournament from './LiveTournament.jsx';
import './BracketForm.css';
import { TurnedInTwoTone } from "@material-ui/icons";
const iframeoptions = '?show_tournament_name=1&show_final_results=1&show_standings=1&scale_to_fit=1';

class BracketComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 0,
      players: [],
      liveUrl: '',
      currentTournament: {},
      tournamentId: undefined,
      matchId : undefined,
      participantId: undefined,
      showIframe: false,
    };
    this.postNewParticipants = this.postNewParticipants.bind(this);
    this.startTournament = this.startTournament.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  participantNameList() {
    return(
      this.state.players.map((player, index) => {
      return <Grid item xs={3} key={index}>
        <Tooltip
        title={
          <React.Fragment>
            <Typography color="inherit">player information</Typography>
          </React.Fragment>
        }
      >
      <Button onClick={() => {this.updateMatchWinner(player["participant"]["id"])}} fullWidth>{player["participant"]["name"]}</Button>
      </Tooltip>
        </Grid>
      })
    )
  };

  createTournament(tournamentInfo = null, players = null) {
    let data = {
      name: tournamentInfo.tournamentName,
      description: tournamentInfo.description,
      private: "false",
    }
    axios.post("/api/createTournament", data)
      .then((res) => {
        console.log(res.data.tournament, "Created tournament data");
        this.setState({
          liveUrl: res.data.tournament.url,
          currentTournament: res.data,
          tournamentId: res.data.tournament.id,
        });
        //post new participants
        this.postNewParticipants(players);
        setTimeout(() => {
          console.log('Saving to database');
        }, 5000)
      })
      .catch((err) => {
        console.log("Error", err);
      });
    //hold_third_place_match] // true or false
  }

  postNewParticipants(participants) {
    participants.tournamentId = this.state.tournamentId;
    axios.post("/api/postParticipant", participants)
      .then((res) => {
        this.setState({ players: res.data });
        this.startMatch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  startMatch() {
    axios.post("/api/startTournament", { tournamentId: this.state.tournamentId })
    .then((res) => {
      this.setState({showIframe: true, view: 2})
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //on click handler when they start the tournament
  startTournament( tournamentInfo, participantInfo ) {
    console.log("Start Tournament:", tournamentInfo, participantInfo);
    //Call this function
    this.createTournament(tournamentInfo, participantInfo)
    //do extra stuff afterwards
  }

  updateMatchWinner(id = null) {
    //we need participant id
    axios.post(`/api/updateMatch`, {
      tournament_id: this.state.tournamentId,
      participant_id: id,
    })
      .then((res) => {
        let deletePlayer = res.data.loserId;
        let filteredPlayers = this.state.players.filter(function (
          player
        ) {
          return player["participant"]["id"] !== deletePlayer;
        });
        //if we got our winner
        if (filteredPlayers.length === 1) {
          //call the finalize tournament function
          this.finalizeTournament();
          this.setState({players: filteredPlayers , showIframe: false});
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
    axios.put('/api/finalizeTournament', {"tournamentId" : id})
    .then((res) => {
      console.log("Finalized tournament");
      this.setState({view: 2, showIframe: true});
    })
    .catch((err) => {
      console.log("error:", err);
    })

  }

  changeView(view = null) {
    if (view === "form") {
      this.setState({view: 0, showIframe: false});
    } else {
      this.setState({view: 2, showIframe: true});
    }
  }

  render() {
    return (
      <Container maxWidth="lg" className="bracketForm">
        <StaticView changeView={this.changeView}/>
        {this.state.view === 0 && <BracketForm
        className="bracketForm"
        startTournament={this.startTournament}
        />}
        {this.state.view === 2 && <LiveTournament players={this.state.players}/>}
        <div>
          {this.state.players.length > 1 && this.state.view === 2 && (
            <Grid container>
              <Grid item xs={5}>
                </Grid>
                <Grid container item xs={7} direction="row">
              {this.participantNameList()}
                </Grid>
            </Grid>
          )}
        </div>
        {this.state.showIframe && this.state.liveUrl ? (
          <iframe
            src={`http://challonge.com/${this.state.liveUrl}/module${iframeoptions}`}
            width="100%"
            height="550"
            frameBorder="0"
            scrolling="auto"
          ></iframe>
        ) : null}

      </Container>
    );
  }
}

export default BracketComponent;
