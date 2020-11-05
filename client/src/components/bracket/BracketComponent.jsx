import React from "react";
import axios from "axios";
import { Container, Grid, Button, Tooltip, Typography } from '@material-ui/core';

import BracketForm from './BracketForm.jsx';
import StaticView from './StaticView.jsx';
import LiveTournament from './LiveTournament.jsx';
import './BracketForm.css';
import { TurnedInTwoTone } from "@material-ui/icons";
import ThirdPlace from "./ThirdPlace.jsx";
const iframeoptions = '?show_tournament_name=1&show_final_results=1&show_standings=1&scale_to_fit=1';

class BracketComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 0,
      players: [],
      liveUrl: '',
      // currentTournament: {},
      tournamentId: undefined,
      matchId : undefined,
      participantId: undefined,
      showIframe: false,
      live_image_url : undefined,
      third_place : [],
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
        let result = res.data;
        this.setState({
          liveUrl: result.tournament.url,
          // currentTournament: res.data,
          tournamentId: result.tournament.id,
          live_image_url: result.tournament.live_image_url,
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

  startTournament( tournamentInfo, participantInfo ) {
    //Call this function
    this.createTournament(tournamentInfo, participantInfo)
  }

  updateMatchWinner(id = null) {
    //we need participant id
    axios.post(`/api/updateMatch`, {
      tournament_id: this.state.tournamentId,
      participant_id: id,
    })
      .then((res) => {
        let deletePlayer = res.data.loserId;
        let players = this.state.players;
        //getting third place here
        if (players.length === 4 || players.length === 3) {
          let thirdPlace = players.find((player) => 
          player["participant"]["id"] === deletePlayer);
          let obj = [...this.state.third_place, thirdPlace];
          this.setState({third_place: obj});
        } 
        let filteredPlayers = players.filter(function (
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
      this.setState({view: 2, showIframe: true}, () => {
        console.log(this.state.third_place, "<--third place");
      });
    })
    .catch((err) => {
      console.log("error:", err);
    })
  }

  openInNewTab(e) {
    e.preventDefault()
    let url = this.state.live_image_url;
    const newWindow = window.open(url, '_blank', 'noopener, noreferrer')
    if (newWindow) newWindow.opener = null
  }

  changeView(view = null) {
    if (view === "form") {
      this.setState({view: 0, showIframe: false});
    } else {
      this.setState({view: 2, showIframe: true});
    }
  }

  render() {
    let view = this.state.view;
    let players = this.state.players;
    let third = this.state.third_place;
    return (
      <Container maxWidth="lg" className="bracketForm">
        <StaticView changeView={this.changeView} 
        />
        {view === 0 && <BracketForm 
        className="bracketForm"
        startTournament={this.startTournament}
        />}
        <div>
        {view === 2 && players.length === 1 ? <Button onClick={() => window.print()}>Print Results</Button> : null}
        {view === 2 && this.state.live_image_url ? <Button onClick={(e) => this.openInNewTab(e)}>Print Bracket</Button> : null}
        </div>
        {view === 2 && <LiveTournament players={players}/>}
        
        <div>
        {players.length > 1 && view === 2 && (
          <Grid container>
          <Grid item xs={8}>
          </Grid>
          <Grid container item xs={4} direction="row">
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
            {third.length === 2 && <ThirdPlace third_place={third}/>}
            </Container>
            );
          }
        }

export default BracketComponent;
