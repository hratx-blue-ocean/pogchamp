import React, { useState } from "react";
import axios from "axios";

class ContainerApp extends React.Component {
  constructor() {
    super();
    this.state = {
      players: [],
      liveUrl: '',
      currentTournament: {},
      playerCount: 0,
      tournamentId: undefined,
      matchId : undefined,
      participantId: undefined,
      showIframe: false,
    };
  }

  createTournament() {
    let body = {};
    axios.post("/api/createTournament", {
        name: "wizardWorldCupFive",
        description: "your not a wizard",
        private: "false",
      })
      .then((res) => {
        console.log(res.data.tournament.url, "created & tournamentlive url");
        this.setState({
          liveUrl: res.data.tournament.url,
          currentTournament: res.data,
          tournamentId: res.data.tournament.id,
        });
      })
      .catch((err) => {
        console.log("error:", err);
      });
    //tournament [name]
    //description]	Description/instructions to be displayed above the bracket
    //tournament[tournament_type] Single elimination (default), double_elimination, round robin, swiss
    //hold_third_place_match] // true or false
  }

  postNewParticipants() {
    // if (this.state.playerCount < 4) {
    //   console.log('need 4 players')
    // } else {
    axios.post("/api/postParticipant", {
        participants: [{ name: "BOOF" }, { name: "TOOF" }, {name: "GOKU"}, {name: "KRILLIN"}],
        tournamentId: this.state.tournamentId,
      })
      .then((res) => {
        this.setState({ players: res.data });
        console.log("new players:", res.data);
      })
      .catch((err) => {
        //422 means username is already defined
        console.log(err);
      });
    // }
  }

  updateMatchWinner(id = null) {
    //we need participantid
    //this comes from active players list in state
    axios.post(`/api/updateMatch`, {
      tournament_id: this.state.tournamentId,
      participant_id: id,
    })
      .then((res) => {
        // console.log(res.data);
        //all taken care in server
      })
      .catch((err) => {
        console.log(err)
      })
  }

  startMatch() {
    axios.post("/api/startTournament", { tournamentId: this.state.tournamentId })
      .then((res) => {
        this.setState({showIframe: true})
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="main">
        <div>Hello World!!</div>
        <button
          style={{ width: 100, height: 50 }}
          onClick={() => this.createTournament()}
        >
          Create a tournament
        </button>
        <button
          style={{ width: 100, height: 50 }}
          onClick={() => this.postNewParticipants()}
        >
          Post new Participants
        </button>
        <button
          style={{ width: 100, height: 50 }}
          onClick={() => this.startMatch()}
        >
          Start Match
        </button>
        {this.state.showIframe ? (
          <iframe
            src={`https://challonge.com/${this.state.liveUrl}/module`}
            width="80%"
            height="500"
            frameBorder="0"
            scrolling="auto"
          ></iframe>
        ) : null}
        <div>
          {this.state.players.length > 1 && (
            <div>
              {this.state.players.map((player, index) => (
                <div onClick={() => this.updateMatchWinner(player["participant"]["id"])} key={index}>
                  name:{player["participant"]["name"]}| id:
                  {player["participant"]["id"]}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}


const iframeTemplate = (
  <iframe
    src="http://challonge.com/liveURL/module"
    width="80%"
    height="500"
    frameBorder="0"
    scrolling="auto"
  ></iframe>
);

export default ContainerApp;
