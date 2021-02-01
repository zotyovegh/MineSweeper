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
  const beginnerLast = "";
  const intermediateLast = "";
  const expertLast = "";

  // const [intervals, setIntervals] = useState([]);

  const [timer, setTimer] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const handleStart = () => {
    console.log("START");
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 0);
      console.log("Timer: " + timer);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(1);
    console.log("RESET");
  };

  /*const escFunction = (e) => {
    if (e.keyCode === 27) {
      this.reset();
    }
  };*/
  /*

 

  const escFunction(event) {
    if (event.keyCode === 27) {
      this.reset();
    }
  }*/
  /*  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }*/

  /*componentWillMount() {
    this.intervals = [];
  }*/

  useEffect(() => {
    console.log("heyy");
    handleReset();
  }, []);

  /* const tick = () => {
    if (openedCells > 0 && game === "running") {
      let time = time + 1;
      setTime(time);
    }
  };*/

  /* const setInterval = (fn, t) => {
    console.log(intervals);
     intervals.push(setInterval(fn, t));
  };*/

  const setLastValues = (beginner, intermediate, expert) => {
    beginnerLast = beginner;
    intermediateLast = intermediate;
    expertLast = expert;
  };

  const reset = () => {
    // setIntervals(intervals.map(clearInterval));

    setOpenedCells(0);
    // setTime(0);
    setGrid(props.grid);
    setColumns(props.columns);
    setMines(props.mines);
    setFlags(props.flags);
    setGame("pending");
    setCategory(getCategory());
    setIsWinningDialog(false);

    //setIntervals([]);
    handleReset();
  };

  const finishGame = () => {
    setGame("ended");
    console.log("DOOOONE");
    handlePause();
  };

  const handleCellInspect = () => {
    console.log("HANDLE INSPECT");
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
      value = beginnerLast;
    } else if (category === "intermediate") {
      value = intermediateLast;
    } else if (category === "expert") {
      value = expertLast;
    }

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
