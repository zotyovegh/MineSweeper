import React, { Component } from "react";
import "./index.css";
import Grid from "./MS/Grid/Grid";
import Header from "./MS/Header/Header";

class App extends Component {
  state = {
    time: 0,
    rows: 10,
    columns: 10,
    mines: 10,
    flags: 10,
  };

  render() {
    return (
      <div className="minesweeper">
        <Header 
        time={this.state.time} 
        flags={this.state.flags} />
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
