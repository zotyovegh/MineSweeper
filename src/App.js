import React, { Component } from "react";
import "./index.css";
import Grid from "./MS/Grid/Grid";

class App extends Component {
  state = {
    rows: 10,
    columns: 10,
    mines: 10,
    flags: 10,
  };

  render() {
    return (
      <div className="minesweeper">
        <Grid
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
        />
      </div>
    );
  }
}

export default App;
