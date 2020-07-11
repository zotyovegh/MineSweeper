import React, { Component } from "react";
import "./index.css";
import Grid from "./Grid";
import Header from "./Header";

import WinningDialog from "./Winningdialog";

class Game extends Component {
  state = {
    openedCells: 0,
    time: 0,
    rows: this.props.rows,
    columns: this.props.columns,
    mines: this.props.mines,
    flags: this.props.flags,
    game: "pending",
    isWinningDialog: false,
  };

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
    this.newState = {
      openedCells: 0,
      time: 0,
      rows: this.props.rows,
      columns: this.props.columns,
      mines: this.props.mines,
      flags: this.props.flags,
      game: "pending",
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
    
    if (
      this.state.mines + this.state.openedCells >=
      this.state.columns * this.state.rows
    ) {
      console.log(this.state.openedCells)
      this.setState({
        game: "won",
        isWinningDialog: true,
      });
    }
  };

  onSaveTime = () => {
    this.setState({isWinningDialog: false})
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
        <WinningDialog
          isOpen={this.state.isWinningDialog}
          onClose={(e) => this.setState({ isWinningDialog: false })}
          onNewGame={this.reset}
          onSaveTime={this.onSaveTime}
          time={this.state.time}
        ></WinningDialog>
      </div>
    );
  }
}

export default Game;
