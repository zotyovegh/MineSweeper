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
      grid: 9,
      columns: 9,
      mines: 10,
    };
    this.game = createRef();
    this.title = "Minesweeper";
  }

  componentWillReceiveProps(nextProps) {
    document.title = this.title;
  }
  
  componentDidMount() {
    document.title = this.title;
  }

  manageDifficulty = () => {
    this.state.isDifficultyOpen
      ? this.setState({ isDifficultyOpen: false })
      : this.setState({ isDifficultyOpen: true, isControlsOpen: false });
  };

  manageControls = () => {
    this.state.isControlsOpen
      ? this.setState({ isControlsOpen: false })
      : this.setState({ isControlsOpen: true, isDifficultyOpen: false });
  };

  manageDifficultyOnNewGame = () => {
    this.state.isDifficultyOpen
      ? this.setState({ isDifficultyOpen: false })
      : this.setState({ isDifficultyOpen: true });
  };

  manageControlsOnNewGame = () => {
    this.state.isControlsOpen
      ? this.setState({ isControlsOpen: false })
      : this.setState({ isControlsOpen: true });
  };

  onNewGame = (recrows, reccolumns, recmines) => {
    this.manageDifficultyOnNewGame();
    this.manageControlsOnNewGame();
    this.setState(
      {
        grid: recrows,
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
          <div>
            <button onClick={this.manageDifficulty}>Difficulty</button>
            <button onClick={this.manageControls}>Controls</button>
          </div>

          <Difficulty
            isOpen={this.state.isDifficultyOpen}
            onClose={(e) => this.setState({ isDifficultyOpen: false })}
            onNewGame={this.onNewGame}
            grid={this.state.grid}
            columns={this.state.columns}
            mines={this.state.mines}
          ></Difficulty>

          <Controls
            isOpen={this.state.isControlsOpen}
            onClose={(e) => this.setState({ isControlsOpen: false })}
          ></Controls>

          <Game
            ref={this.game}
            grid={this.state.grid}
            columns={this.state.columns}
            mines={this.state.mines}
            flags={this.state.mines}
          />
        </div>
        <div>
          <Highscore lastValue={this.getLastValue} />
        </div>
      </div>
    );
  }
}

export default Minesweeper;
