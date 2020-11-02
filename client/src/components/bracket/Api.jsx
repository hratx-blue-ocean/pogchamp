import React, { useState } from "react";
import axios from "axios";
const apikey = "";
const iframe = (
  <iframe
    src="http://challonge.com/ouf5oo9m/module"
    width="80%"
    height="500"
    frameBorder="0"
    scrolling="auto"
  ></iframe>
);

class ContainerApp extends React.Component {
  constructor() {
    super();
    this.state = {
      players: [{ participant: { name: "tosty", id: 123, tournament_id: 1 } }],
      rose: 133226659,
      idlookinfor: null,
      liveUrl: undefined,
      currentTournament: {},
      playerCount: 0,
      tournamentId: undefined,
    };
  }

  createTournament() {
    let body = {};
    axios.post("/api/createTournament", {
        name: "brandNew",
        description: "your not a wizard",
        private: "false",
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          liveUrl: res.data.tournament.url,
          currentTournament: res.data,
          tournamentId : res.data.tournament.id,
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
      // axios.post('https://api.challonge.com/v1/tournaments/9068901/participants.json?api_key=qgTPawy7NEkqDzkJ4cuykTJaJkRaNVkweRZEr8d7', name)
      axios.post("/api/postParticipant", {
        participants: [{name: "BOOF"}, {name: "TOOF"}],
        tournamentId: this.state.tournamentId,
      })
        .then((res) => {
          this.setState({players: res.data})
          console.log("new players:", res.data);
        })
        .catch((err) => {
          //422 means username is already defined
          console.log(err);
        });
    // }
  }

  getMatches() {
    //GET https://api.challonge.com/v1/tournaments/{tournament}/matches.{json|xml}
    axios.get(`https://milito1234@api.challonge.com/v1/tournaments/twm2hki0/matches.json?api_key=${apikey}&participant_id=${this.state.rose}&state=open`)
    // axios.get('/api/getMatches')
      .then((res) => {
        console.log(res.data[0]["match"]["id"], "id?");
        this.setState({ idlookinfor: res.data[0]["match"]["id"] });
      })
      .catch((err) => {
        console.log("error:".err);
      });
  }

  getPlayers() {
    //GET https://api.challonge.com/v1/tournaments/{tournament}/participants.{json|xml}
    axios.get(`https://api.challonge.com/v1/tournaments/twm2hki0/participants.json?api_key=${apikey}`)
      .then((res) => {
        console.log(res.data);
        this.setState({ players: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  pingApi() {
    console.log("ping api");
    // https://api.challonge.com/v1/tournaments/{tournament}.{json|xml}
    axios.get(`https://milito1234@api.challonge.com/v1/tournaments/bracket.json?api_key=${apikey}&include_participants=1&include_matches=1`)
      .then((res) => {
        console.log("sucess:", res.data);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }

  updateMatchOld() {
    // PUT https://api.challonge.com/v1/tournaments/{tournament}/matches/{match_id}.{json|xml}
    //tournament name required
    //ROSES ID
    let obj = { winner_id: this.state.rose };
    let id = this.state.idlookinfor;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios.put(`https://milito1234@api.challonge.com/v1/tournaments/bracket/matches/${id}.json?api_key=${apikey}`, obj, options.headers)
      .then((res) => {
        console.log("update match".res);
      })
      .catch((err) => {
        console.log("ERROR MATCH", err);
      });
  }

  updateMatch() {
    let obj = { winner_id: this.state.rose };
    let id = this.state.idlookinfor;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios.get(`http://localhost:7000/update`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // RenderParticipants = () => {
  //   let list = this.state.players.forEach((player, index) => {
  //     //needed properties id, tournament_id, name
  //     console.log('console.log?', player.participant);
  //     return (
  //       <div>
  //       <p>{player.participant.name}</p>
  //       <p>{player.participant.id}</p>
  //       <p>{player.participant.tournament_id}</p>

  //       </div>
  //     )
  //   })
  //   return (
  //     <div>
  //       {list}
  //     </div>
  //   )
  // }

  // {iframe}
  render() {
    let liveUrl = this.state;
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
          onClick={() => this.getPlayers()}
        >
          Get Participants list
        </button>
        <button
          style={{ width: 100, height: 50 }}
          onClick={() => this.pingApi()}
        >
          Get Match info
        </button>
        <button
          style={{ width: 100, height: 50 }}
          onClick={() => this.getMatches()}
        >
          Get match results
        </button>
        <button
          style={{ width: 100, height: 50 }}
          onClick={() => this.updateMatch()}
        >
          Update Match Button
        </button>
        <button
          style={{ width: 100, height: 50 }}
          onClick={() => this.postNewParticipants()}
        >
          Post new Participant
        </button>
        {this.state.liveUrl ? (
          <iframe
            src={`http://challonge.com/${this.state.liveUrl}/module`}
            width="80%"
            height="500"
            frameBorder="0"
            scrolling="auto"
          ></iframe>
        ) : null}
        <div>
          {this.state.players.length > 1 && (
            <div>
              {" "}
              {this.state.players.map((player, index) => (
                <div key={index}>
                  name:{player["participant"]["name"]}| id:
                  {player["participant"]["id"]}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          style={{ width: 100, height: 50 }}
          onClick={() => console.log(this.state.currentTournament)}
        >
          Show new Tournament Data
        </button>
      </div>
    );
  }
}

export default ContainerApp;
