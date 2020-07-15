import React, { Component } from "react";
import "./index.css";
import Grid from "./Grid";
import Header from "./Header";

import WinningDialog from "./Winningdialog";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openedCells: 0,
      time: 0,
      rows: props.rows,
      columns: props.columns,
      mines: props.mines,
      flags: props.flags,
      game: "pending",
      isWinningDialog: false,
      category: this.getCategory(),
      beginner: "",
      intermediate: "",
      expert: "",
    };
    this.beginnerLast = "";
    this.intermediateLast = "";
    this.expertLast = "";
  }

  getCategory = () => {
    if (
      this.props.rows === 9 &&
      this.props.columns === 9 &&
      this.props.mines === 10
    ) {
      return "beginner";
    } else if (
      this.props.rows === 16 &&
      this.props.columns === 16 &&
      this.props.mines === 40
    ) {
      return "intermediate";
    } else if (
      this.props.rows === 16 &&
      this.props.columns === 30 &&
      this.props.mines === 99
    ) {
      return "expert";
    } else {
      return "";
    }
  };

  componentWillMount() {
    this.intervals = [];
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

  setLastValues = (beginner, intermediate, expert) => {
    this.beginnerLast = beginner;
    this.intermediateLast = intermediate;
    this.expertLast = expert;
  };

  reset = () => {
    this.newState = {
      openedCells: 0,
      time: 0,
      rows: this.props.rows,
      columns: this.props.columns,
      mines: this.props.mines,
      flags: this.props.flags,
      game: "pending",
      category: this.getCategory(),
    };

    this.intervals.map(clearInterval);

    this.setState({ ...this.newState }, () => {
      this.intervals = [];
    });
    this.setState({ isWinningDialog: false });
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
    this.setState({
      beginner: this.beginnerLast,
      intermediate: this.intermediateLast,
      expert: this.expertLast,
      game: "won",
      isWinningDialog: true,
    });
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
          winning={this.winning}
        />
        <WinningDialog
          category={this.state.category}
          isOpen={this.state.isWinningDialog}
          onClose={(e) => this.setState({ isWinningDialog: false })}
          onNewGame={this.reset}
          time={this.state.time}
          beginnerLast={this.state.beginner}
          intermediateLast={this.state.intermediate}
          expertLast={this.state.expert}
        ></WinningDialog>
      </div>
    );
  }
}

export default Game;
