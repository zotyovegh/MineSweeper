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

  lastValue = (beginner, intermediate, expert) => {
    var beginnerLast = 0;
    var intermediateLast = 0;
    var expertLast = 0;

    if (beginner.length < 10) {
      beginnerLast =
        beginner[beginner.length - 1] &&
        beginner[beginner.length - 1].highscore;
    } else {
      beginnerLast = beginner[9] && beginner[9].highscore;
    }

    if (intermediate.length < 10) {
      intermediateLast =
        intermediate[intermediate.length - 1] &&
        intermediate[intermediate.length - 1].highscore;
    } else {
      intermediateLast = intermediate[9] && intermediate[9].highscore;
    }

    if (expert.length < 10) {
      expertLast =
        expert[expert.length - 1] && expert[expert.length - 1].highscore;
    } else {
      expertLast = expert[9] && expert[9].highscore;
    }

    console.log(beginnerLast + " " + intermediateLast + " " + expertLast);
  };

  render() {
    return (
      <div>
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
        <Highscore lastValue={this.lastValue} />
      </div>
    );
  }
}

export default Minesweeper;
