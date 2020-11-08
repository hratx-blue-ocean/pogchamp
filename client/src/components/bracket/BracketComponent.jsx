import React from "react";
import {
  Button,
  Container,
  Grid,
  Tooltip,
  Typography
} from '@material-ui/core';
import { TurnedInTwoTone } from "@material-ui/icons";
import BracketForm from './BracketForm.jsx';
import LiveTournament from './LiveTournament.jsx';
import StaticView from './StaticView.jsx';
import axios from "axios";
import './BracketForm.css';

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
      matchId: undefined,
      participantId: undefined,
      showIframe: false,
      prizeAmount: {},
      winners: { "first": {}, "second": {}, "third": [] },
      live_image_url: '',
    };

    this.postNewParticipants = this.postNewParticipants.bind(this);
    this.startTournament = this.startTournament.bind(this);
    this.changeView = this.changeView.bind(this);
    this.updateMatchWinner = this.updateMatchWinner.bind(this);
  }

  // componentDidMount() {
  //   this.showTopFive();
  // }

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
            <Button onClick={() => { this.updateMatchWinner(player["participant"]["id"]) }} fullWidth>{player["participant"]["name"]}</Button>
          </Tooltip>
        </Grid>
      })
    )
  };

  createTournament(tournamentInfo = null, players = null) {
    let data = {
      data: {
        name: tournamentInfo.tournamentName,
        description: tournamentInfo.description,
        private: "false",
      },
      form: {
        date: new Date().toString(),
        type: 'bracket',
        hostName: this.state.username,
        playerLimit: tournamentInfo.numberOfPlayers,
        registered: [],
        totalPrize: tournamentInfo.prizeAmount,
        winner: null
      }
    };

    axios.post("/api/createTournament", data)
      .then((res) => {
        this.setState({
          liveUrl: res.data.tournament.url,
          currentTournament: res.data,
          tournamentId: res.data.tournament.id,
          live_image_url: res.data.tournament.live_image_url,
        });
        this.postNewParticipants(players);
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
        this.setState({ showIframe: true, view: 2 })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  startTournament( tournamentInfo, participantInfo ) {
    console.log("Start Tournament:", tournamentInfo, participantInfo);
    this.createTournament(tournamentInfo, participantInfo)

    let prize = {
      first: Math.floor(tournamentInfo.prizeAmount * .50),
      second: Math.floor(tournamentInfo.prizeAmount * .30),
      third: Math.floor(tournamentInfo.prizeAmount * .20),
    }

    this.setState({ prizeAmount: prize }, () => {
      console.log('prizeAmount:', this.state.prizeAmount);
    });
  }

  updateMatchWinner(id = null) {
    axios.post(`/api/updateMatch`, {
      tournament_id: this.state.tournamentId,
      participant_id: id,
    })
      .then((res) => {
        let deletePlayer = res.data.loserId;
        let players = this.state.players;
        let winnersObj = this.state.winners;
        if (players.length === 3 || players.length === 2 ||
          players.length === 4) {
          let playerObj = players.find((player) =>
            player["participant"]["id"] === deletePlayer);
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
          return player["participant"]["id"] !== deletePlayer;
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
        this.setState({ view: 2, showIframe: true }, () => {
          // console.log(this.state.winners, this.state.prizeAmount, "new");
        })
      })
      .then(() => {
        let money = this.state.prizeAmount;
        let winnings = {};
        winnings[this.state.winners.first.participant.name] = money.first;
        winnings[this.state.winners.second.participant.name] = money.second;
        winnings[this.state.winners.third[0].participant.name] = money.third;

        axios.post('/api/declareWinner', { tournamentId: this.state.tournamentId, username: this.state.players[0]["participant"]["name"], winnings: winnings })
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

  // showTopFive() {
  //   axios.get('/api/top')
  //   .then(results => {
  //     console.log(results);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // };

  changeView(view = null) {
    if (view === "form") {
      this.setState({ view: 0, showIframe: false });
    } else {
      this.setState({ view: 2, showIframe: true });
    }
  }

  render() {
    let view = this.state.view;
    let players = this.state.players;
    return (
      <Container maxWidth="lg" className="bracketForm">
        <StaticView changeView={this.changeView} />

        {view === 0 && <BracketForm
          className="bracketForm"
          startTournament={this.startTournament}
        />}
        {view === 2 && <LiveTournament players={players} prizes={this.state.prizeAmount}
          winners={this.state.winners} live_image_url={this.state.live_image_url} />}

        <div>
          {players.length > 1 && view === 2 && (
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
