import React, { Component, createRef } from "react";

import Game from "../../minesweeper/src/Game";
import Difficulty from "./Difficulty";
import "./index.css";
import Highscore from "./Highscore";

class Minesweeper extends Component {
  constructor(props) {
    super();
    this.state = {
      isOpen: false,
      //beginner
      rows: 9,
      columns: 9,
      mines: 10,
    };
    this.game = createRef();
  }

  manageDifficulty = () => {
    this.state.isOpen
      ? this.setState({ isOpen: false })
      : this.setState({ isOpen: true });
  };

  onNewGame = (recrows, reccolumns, recmines) => {
    this.manageDifficulty();
    this.setState(
      {
        rows: recrows,
        columns: reccolumns,
        mines: recmines,
      },
      () => {
        this.game.current.reset();
      }
    );
  };

  getLastValue = (beginner, intermediate, expert) => {
    if (this.game.current !== null) {
      this.game.current.setLastValues(beginner, intermediate, expert);
    }
  };

  render() {
    return (
      <div>
        
        <div className="game">
          <button onClick={this.manageDifficulty}>Difficulty</button>
          <Difficulty
            isOpen={this.state.isOpen}
            onClose={(e) => this.setState({ isOpen: false })}
            onNewGame={this.onNewGame}
            rows={this.state.rows}
            columns={this.state.columns}
            mines={this.state.mines}
          ></Difficulty>

          <Game
            ref={this.game}
            rows={this.state.rows}
            columns={this.state.columns}
            mines={this.state.mines}
            flags={this.state.mines}
          />
        </div>
        <div className="highscore">
          <Highscore lastValue={this.getLastValue} />
        </div>
      </div>
    );
  }
}

export default Minesweeper;
