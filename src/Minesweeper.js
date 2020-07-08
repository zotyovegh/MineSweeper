import React, { Component } from "react";
import Game from "../../minesweeper/src/Game";
import Dialog from "./Dialog/Dialog";
import "./index.css";

class Minesweeper extends Component {
  state = {
    isOpen: true,
  };

  changeDialog = () => {
    this.state.isOpen
      ? this.setState({ isOpen: false })
      : this.setState({ isOpen: true });
  };

  onNewGame = () => {
    
    this.changeDialog();
  };

  render() {
    return (
      <div>
        <button onClick={this.changeDialog}>Game</button>
        <div>
          <Dialog
            isOpen={this.state.isOpen}
            onClose={(e) => this.setState({ isOpen: false })}
            onNewGame={this.onNewGame}
          ></Dialog>
        </div>

        <Game />
      </div>
    );
  }
}

export default Minesweeper;
