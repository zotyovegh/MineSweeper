import React, { useState, useEffect } from "react";
import Cell from "../Cell";
import logo from "./GithubLogo.jpg";

function Grid(props) {
  const createGrid = (p) => {
    let newGrid = [];

    for (let i = 0; i < p.grid; i++) {
      newGrid.push([]);
      for (let j = 0; j < p.columns; j++) {
        newGrid[i].push({
          x: j,
          y: i,

          minesAround: 0,
          hasMine: false,
          isPressed: false,
          hasFlag: false,
        });
      }
    }

    for (let i = 0; i < p.mines; i++) {
      let row = Math.floor(Math.random() * p.grid);
      let col = Math.floor(Math.random() * p.columns);

      let chosencell = newGrid[row][col];

      if (chosencell.hasMine) {
        i--;
      } else {
        chosencell.hasMine = true;
      }
    }
    return newGrid;
  };
  const [grid, setGrid] = useState(createGrid(props));
  const [openCells, setOpenCells] = useState(props.openedCells);

  useEffect(() => {
     if (
      openCells.openedCells > props.openedCells ||
      props.openedCells === 0
    ) {
     // setGrid(createGrid(props));
    }
   // 
  });

  const click = (cell) => {
    if (props.game === "ended" || props.game === "won") {
      return;
    }

    let neighbours = new Promise((resolve) => {
      let bombs = countNeighbours(cell);
      resolve(bombs);
    });

    neighbours.then((countNeighbours) => {
      let originalGrid = grid;
      let currentCell = originalGrid[cell.y][cell.x];
      currentCell.minesAround = countNeighbours;
      if (
        (currentCell.hasMine && props.openedCells === 0) ||
        (props.openedCells === 0 && currentCell.minesAround >= 1)
      ) {
        let newGrid = createGrid(props);
        (function () {
          setGrid(newGrid);
        })(click(cell));
      } else {
        if (!currentCell.isPressed && !cell.hasFlag) {
          props.onCellInspect();
          currentCell.isPressed = true;

          (function () {
            setGrid(originalGrid);
          })(winCheck());

          if (!currentCell.hasMine && countNeighbours === 0) {
            countEmptyCell(cell);
          }
          if (currentCell.hasMine && props.openedCells !== 0) {
            revealBombs();
            props.finishGame();
          }
        }
      }
    });
  };

  const winCheck = () => {
    let originalGrid = grid;
    if (props.mines + props.openedCells >= props.columns * props.grid) {
      for (let row = 0; row < originalGrid.length; row++) {
        for (let col = 0; col < originalGrid[0].length; col++) {
          let cell = originalGrid[row][col];
          if (cell.hasMine && cell.isPressed) {
            return;
          }
        }
      }
      props.winning();
    }
  };

  const revealBombs = () => {
    let originalGrid = grid;
    for (let row = 0; row < originalGrid.length; row++) {
      for (let col = 0; col < originalGrid[0].length; col++) {
        let cell = originalGrid[row][col];
        if (
          (cell.hasFlag && !cell.hasMine) ||
          (cell.hasMine && !cell.hasFlag)
        ) {
          cell.isPressed = true;
        }
      }
    }
  };

  const countNeighbours = (cell) => {
    //Method based on the reference code, that was created in java
    let total = 0;
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          let rowOff = row + cell.y;
          let colOff = col + cell.x;
          if (rowOff < grid.length && colOff < grid[0].length) {
            if (grid[rowOff][colOff].hasMine && !(row === 0 && col === 0)) {
              total++;
            }
          }
        }
      }
    }
    return total;
  };

  const countEmptyCell = (cell) => {
    //Spin through the neighbouring cells just as in the before method
    let orginalGrid = grid;
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          let rowOff = row + cell.y;
          let colOff = col + cell.x;
          if (rowOff < grid.length && colOff < grid[0].length) {
            if (
              !orginalGrid[rowOff][colOff].hasMine &&
              !orginalGrid[rowOff][colOff].isPressed
            ) {
              click(orginalGrid[rowOff][colOff]);
            }
          }
        }
      }
    }
  };

  const flag = (cell) => {
    let originalGrid = grid;
    if (
      props.game === "ended" ||
      props.game === "won" ||
      props.game !== "running"
    ) {
      return;
    } else if (!cell.isPressed) {
      cell.hasFlag = !cell.hasFlag;
      setGrid(originalGrid);
      props.changeFlagsNumber(cell.hasFlag ? -1 : 1);
    }
  };

  //Create grid
  let mainGrid = grid.map((row, index) => {
    return (
      <div key={index} className="grid__row">
        {row.map((cell, cellIndex) => {
          return <Cell key={cellIndex} data={cell} click={click} flag={flag} />;
        })}
      </div>
    );
  });
  return (
    <div className="grid">
      {mainGrid}
      <div className="grid__logo">
        <a href="https://github.com/zotyovegh/MineSweeper">
          {" "}
          <img width="100" height="25" src={logo} />
        </a>
      </div>
    </div>
  );
}

export default Grid;
