import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import Grid from "./Grid";
import Header from "./Header";

import WinningDialog from "./Winningdialog";

function Game(props) {
  const getCategory = () => {
    if (props.grid === 9 && props.columns === 9 && props.mines === 10) {
      return "beginner";
    } else if (
      props.grid === 16 &&
      props.columns === 16 &&
      props.mines === 40
    ) {
      return "intermediate";
    } else if (
      props.grid === 16 &&
      props.columns === 30 &&
      props.mines === 99
    ) {
      return "expert";
    } else {
      return "";
    }
  };
  const [openedCells, setOpenedCells] = useState(0);
  const [grid, setGrid] = useState(props.grid);
  const [columns, setColumns] = useState(props.columns);
  const [mines, setMines] = useState(props.mines);
  const [flags, setFlags] = useState(props.flags);
  const [game, setGame] = useState("pending");
  const [isWinningDialog, setIsWinningDialog] = useState(false);
  const [category, setCategory] = useState(getCategory());
  const [limit, setLimit] = useState("");
 

  // const [intervals, setIntervals] = useState([]);

  const [timer, setTimer] = useState(1);
  const countRef = useRef(null);

  const handleStart = () => {
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setTimer(0);
  };

  /*const escFunction = (e) => {
    if (e.keyCode === 27) {
      this.reset();
    }
  };
  const escFunction(event) {
    if (event.keyCode === 27) {
      this.reset();
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }*/

  useEffect(() => {
    handleReset();
  }, []);

  /*const setLastValues = (beginner, intermediate, expert) => {
    console.log("SETTINGS: " + beginner + " " + intermediate + " " + expert);
    beginnerLast = beginner;
    intermediateLast = intermediate;
    expertLast = expert;
  };*/

  const reset = () => {
    setOpenedCells(0);
    setGrid(props.grid);
    setColumns(props.columns);
    setMines(props.mines);
    setFlags(props.flags);
    setGame("pending");
    setCategory(getCategory());
    setIsWinningDialog(false);

    handleReset();
  };

  const finishGame = () => {
    setGame("ended");
    handlePause();
  };

  const handleCellInspect = () => {
    if (game !== "running" && openedCells === 0) {
      (function () {
        setGame("running");
      })(handleStart());
    }

    setOpenedCells((previousState) => previousState + 1);
  };

  const changeFlagsNumber = (amount) => {
    setFlags(flags + amount);
  };

  const winning = () => {
    var value;
    if (category === "beginner") {
      value = props.beginner;
    } else if (category === "intermediate") {
      value = props.intermediate;
    } else if (category === "expert") {
      value = props.expert;
    }
    console.log("Category: " + category);
    console.log("Limit: " + limit);

    setLimit(value);
    setGame("won");
    handlePause();
    setIsWinningDialog(true);
  };

  var widthstyle = {
    width: columns * 34 + (columns >= 8 ? +12 : 9),
  };
  return (
    <div className="game">
      <div style={widthstyle}>
        <Header time={timer} flags={flags} reset={reset} columns={columns} />
      </div>
      <div style={widthstyle}>
        <Grid
          game={game}
          openedCells={openedCells}
          grid={grid}
          columns={columns}
          mines={mines}
          changeFlagsNumber={changeFlagsNumber}
          onCellInspect={handleCellInspect}
          finishGame={finishGame}
          winning={winning}
        />
      </div>

      <WinningDialog
        category={category}
        isOpen={isWinningDialog}
        onClose={(e) => setIsWinningDialog(false)}
        onNewGame={reset}
        time={timer}
        limit={limit}
      ></WinningDialog>
    </div>
  );
}

export default Game;
