import React, { Component } from "react";
import "./index.css";
import Minesweeper from "./Minesweeper";
class Game extends Component {
  render() {
    return (
      <div className="game">
        <Minesweeper />
      </div>
    );
  }
}

export default Game;
