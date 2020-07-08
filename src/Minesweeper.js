import React, { Component } from "react";
import Game from "../../minesweeper/src/Game";
import Dialog from "./Dialog";
import "./index.css";

class Minesweeper extends Component {
  state = {
    isOpen: false,
    rows: 10,
    columns: 10,
    mines: 15,
    flags: 15,
  };

  changeDialog = () => {
    this.state.isOpen
      ? this.setState({ isOpen: false })
      : this.setState({ isOpen: true });
  };

  onNewGame = () => {
    this.changeDialog();
    console.log("heyy");
    this.setState({ rows: 20 });
  };

  render() {
    return (
      <div>
        <button onClick={this.changeDialog}>Game</button>

        <Dialog
          isOpen={this.state.isOpen}
          onClose={(e) => this.setState({ isOpen: false })}
          onNewGame={this.onNewGame}
        ></Dialog>

        <Game
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          flags={this.state.flags}
        />
      </div>
    );
  }
}

export default Minesweeper;
