import React, { useState, createRef, useEffect } from "react";

import Game from "../../minesweeper/src/Game";
import Difficulty from "./Difficulty";
import Controls from "./Controls";
import "./index.css";
import Highscore from "./Highscore";

function Minesweeper() {
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [grid, setGrid] = useState(9);
  const [columns, setColumns] = useState(9);
  const [mines, setMines] = useState(10);
  const game = createRef();
  const [beginner, setBeginner] = useState(10000);
  const [intermediate, setIntermediate] = useState(10000);
  const [expert, setExpert] = useState(10000);

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

  const getLastValue = (beg, inter, exp) => {
    setBeginner(beg);
    setIntermediate(inter);
    setExpert(exp);
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
        beginner={beginner}
        intermediate={intermediate}
        expert={expert}
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
