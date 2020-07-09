import React, { Component, createRef } from "react";

import Game from "../../minesweeper/src/Game";
import Dialog from "./Dialog";
import "./index.css";

class Minesweeper extends Component {
  constructor(props) {
    super();
    this.state = {
      isOpen: false,
      rows: 10,
      columns: 10,
      mines: 5,
    };
    this.game = createRef();
  }

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

        <Dialog
          isOpen={this.state.isOpen}
          onClose={(e) => this.setState({ isOpen: false })}
          onNewGame={this.onNewGame}
        ></Dialog>

        <Game
          ref={this.game}
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          flags={this.state.mines}
        />
      </div>
    );
  }
}

export default Minesweeper;
