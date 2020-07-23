import React, { Component, createRef } from "react";

import Game from "../../minesweeper/src/Game";
import Difficulty from "./Difficulty";
import Controls from "./Controls";
import "./index.css";
import Highscore from "./Highscore";

class Minesweeper extends Component {
  constructor(props) {
    super();
    this.state = {
      isDifficultyOpen: false,
      isControlsOpen: false,
      //beginner
      rows: 9,
      columns: 9,
      mines: 10,
    };
    this.game = createRef();
  }

  manageDifficulty = () => {
    this.state.isDifficultyOpen
      ? this.setState({ isDifficultyOpen: false })
      : this.setState({ isDifficultyOpen: true });
  };

  manageControls = () => {
    this.state.isControlsOpen
      ? this.setState({ isControlsOpen: false })
      : this.setState({ isControlsOpen: true });
  };

  onNewGame = (recrows, reccolumns, recmines) => {
    this.manageDifficulty();
    this.manageControls();
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
            isOpen={this.state.isDifficultyOpen}
            onClose={(e) => this.setState({ isDifficultyOpen: false })}
            onNewGame={this.onNewGame}
            rows={this.state.rows}
            columns={this.state.columns}
            mines={this.state.mines}
          ></Difficulty>

          <button onClick={this.manageControls}>Controls</button>
          <Controls
            isOpen={this.state.isControlsOpen}
            onClose={(e) => this.setState({ isControlsOpen: false })}
          ></Controls>

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
