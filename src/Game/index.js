import React, { Component } from "react";
import "./index.css";
import Grid from "./Grid";
import Header from "./Header";

class Game extends Component {
  constructor(props) {
    super();
    this.state = {
      openedCells: 0,
      time: 0,
      rows: 15,
      columns: 15,
      mines: 20,
      flags: 20,
      game: "pending",
    };

    this.newState = this.state;
  }

  componentWillMount() {
    this.intervals = [];
  }

  componentDidUpdate() {
    if (this.state.game === "running") {
      this.winning();
    }
  }

  tick = () => {
    if (this.state.openedCells > 0 && this.state.game === "running") {
      let time = this.state.time + 1;
      this.setState({ time });
    }
  };

  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn, t));
  };

  reset = () => {
    this.intervals.map(clearInterval);

    this.setState({ ...this.newState }, () => {
      this.intervals = [];
    });
  };

  finishGame = () => {
    this.setState({
      game: "ended",
    });
  };

  handleCellInspect = () => {
    if (this.state.game !== "running" && this.state.openedCells === 0) {
      this.setState(
        {
          game: "running",
        },
        () => {
          this.setInterval(this.tick, 1000);
        }
      );
    }

    this.setState((previousState) => {
      return { openedCells: previousState.openedCells + 1 };
    });
  };

  changeFlagsNumber = (amount) => {
    this.setState({ flags: this.state.flags + amount });
  };

  winning = () => {
    if (
      this.state.mines + this.state.openedCells >=
      this.state.columns * this.state.rows
    ) {
      this.setState({
        game: "won",
      });
    }
  };

  render() {
    return (
      <div className="minesweeper">
        <Header
          time={this.state.time}
          flags={this.state.flags}
          reset={this.reset}
        />
        <Grid
          game={this.state.game}
          openedCells={this.state.openedCells}
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          changeFlagsNumber={this.changeFlagsNumber}
          onCellInspect={this.handleCellInspect}
          finishGame={this.finishGame}
        />
      </div>
    );
  }
}

export default Game;
