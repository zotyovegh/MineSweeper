import React, { Component } from "react";
import "./index.css";
import Grid from "./MS/Grid/Grid";
import Header from "./MS/Header/Header";

class App extends Component {
  state = {
    openedCells: 0,
    time: 0,
    rows: 10,
    columns: 10,
    mines: 10,
    flags: 10,
    game: "pending", //Can be pending, running and ended
  };

  handleCellInspect = () => {
    if (this.state.game !== "running" && this.state.openedCells === 0) {
      this.setState({
        game = "running"
      })
    }
  };

  render() {
    return (
      <div className="minesweeper">
        <Header time={this.state.time} flags={this.state.flags} />
        <Grid
          openedCells={this.openedCells}
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          handleCellInspect={this.state.handleCellInspect}
        />
      </div>
    );
  }
}

export default App;
