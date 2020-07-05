import React, { Component } from "react";
import "./index.css";
import Grid from "./MS/Grid/Grid";
import Header from "./MS/Header/Header";

class App extends Component {
  constructor() {
    super();
    this.state = {
      openedCells: 0,
      time: 0,
      rows: 10,
      columns: 10,
      mines: 15,
      flags: 15,
      game: "pending", //Can be pending, running and ended
    };

    this.savedState = this.state;
  }

  reset = () => {
    this.setState({...this.savedState});
  };

  finishGame = () => {
    this.setState({
      game: "ended",
    });
  };

  handleCellInspect = () => {
    if (this.state.game !== "running" && this.state.openedCells === 0) {
      this.setState({
        game: "running",
      });
    }

    this.setState((previousState) => {
      return { openedCells: previousState.openedCells + 1 };
    });
  };

  changeFlagsNumber = (amount) => {
    this.setState({ flags: this.state.flags + amount });
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

export default App;
