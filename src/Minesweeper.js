import React, { useState, createRef } from "react";

import Game from "../../minesweeper/src/Game";
import Difficulty from "./Difficulty";
import Controls from "./Controls";
import "./index.css";
import Highscore from "./Highscore";

function Minesweeper(props) {
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [grid, setGrid] = useState(9);
  const [columns, setColumns] = useState(9);
  const [mines, setMines] = useState(10);
  const game = createRef();
  /* constructor(props) {
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
    //this.title = "Minesweeper";
  }*/

  /*componentWillReceiveProps(nextProps) {
    document.title = this.title;
  }

  componentDidMount() {
    document.title = this.title;
  }*/

  const manageDifficulty = () => {
    isDifficultyOpen
      ? setIsDifficultyOpen(false)
      : (function () {
          setIsDifficultyOpen(true);
        })(setIsControlsOpen(false));
  };

  const manageControls = () => {
    isControlsOpen
      ? setIsControlsOpen(false)
      : (function () {
          setIsControlsOpen(true);
        })(setIsDifficultyOpen(false));
  };

  const manageDifficultyOnNewGame = () => {
    isDifficultyOpen ? setIsDifficultyOpen(false) : setIsDifficultyOpen(true);
  };

  const manageControlsOnNewGame = () => {
    isControlsOpen ? setIsControlsOpen(false) : setIsControlsOpen(true);
  };

  const onNewGame = (recrows, reccolumns, recmines) => {
    manageDifficultyOnNewGame();
    manageControlsOnNewGame();
    (function () {
      setGrid(recrows);
      setColumns(reccolumns);
      setMines(recmines);
    })(game.current.reset());
  };

  const getLastValue = (beginner, intermediate, expert) => {
    if (game.current !== null) {
      game.current.setLastValues(beginner, intermediate, expert);
    }
  };

  return (
    <div>
      <button onClick={manageDifficulty}>Difficulty</button>
      <button onClick={manageControls}>Controls</button>
      <Difficulty
        isOpen={isDifficultyOpen}
        onClose={(e) => setIsDifficultyOpen(false)}
        onNewGame={onNewGame}
        grid={grid}
        columns={columns}
        mines={mines}
      ></Difficulty>
      <Controls
        isOpen={isControlsOpen}
        onClose={(e) => setIsControlsOpen(false)}
      ></Controls>
      <Game
        ref={game}
        grid={grid}
        columns={columns}
        mines={mines}
        flags={mines}
      />
      <Highscore lastValue={getLastValue} />
    </div>
  );
}

export default Minesweeper;
