import React, { Component } from "react";
import Game from "../../minesweeper/src/Game";
import Dialog from "./Dialog/Dialog";
import "./index.css";

class Minesweeper extends Component {
  state = {
    IsOpen: false,
  };
  render() {
    return (
      <div>
        <button onClick={(e) => this.setState({ isOpen: true })}>Game</button>
        <div>
          <Dialog
            isOpen={this.state.isOpen}
            onClose={(e) => this.setState({ isOpen: false })}
          ></Dialog>
        </div>

        <Game />
      </div>
    );
  }
}

export default Minesweeper;
