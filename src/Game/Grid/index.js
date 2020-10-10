import React, { Component } from "react";
import GridRow from "../GridRow";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.createGrid(props),
    };
    this.isNew = false;
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.openedCells > nextProps.openedCells ||
      this.props.openedCells === 0
    ) {
      this.setState({
        grid: this.createGrid(nextProps),
      });
    }
  }

  createGrid = (props) => {
    let grid = [];

    for (let i = 0; i < props.grid; i++) {
      grid.push([]);
      for (let j = 0; j < props.columns; j++) {
        grid[i].push({
          x: j,
          y: i,

          minesAround: 0,
          hasMine: false,
          isPressed: false,
          hasFlag: false,
        });
      }
    }

    for (let i = 0; i < props.mines; i++) {
      let row = Math.floor(Math.random() * props.grid);
      let col = Math.floor(Math.random() * props.columns);

      let chosencell = grid[row][col];

      if (chosencell.hasMine) {
        i--;
      } else {
        chosencell.hasMine = true;
      }
    }
    return grid;
  };

  click = (cell) => {
    if (this.props.game === "ended" || this.props.game === "won") {
      return;
    }

    let neighbours = new Promise((resolve) => {
      let bombs = this.countNeighbours(cell);

      resolve(bombs);
    });

    neighbours.then((countNeighbours) => {
      let grid = this.state.grid;
      let currentCell = grid[cell.y][cell.x];
      currentCell.minesAround = countNeighbours;
      if (
        (currentCell.hasMine && this.props.openedCells === 0) ||
        (this.props.openedCells === 0 && currentCell.minesAround >= 1)
      ) {
        let newGrid = this.createGrid(this.props);
        this.setState(
          {
            grid: newGrid,
          },
          () => {
            this.click(cell);
          }
        );
      } else {
        if (!currentCell.isPressed && !cell.hasFlag) {
          this.props.onCellInspect();
          currentCell.isPressed = true;

          this.setState({ grid }, () => {
            this.winCheck();
          });
          if (!currentCell.hasMine && countNeighbours === 0) {
            this.countEmptyCell(cell);
          }
          if (currentCell.hasMine && this.props.openedCells !== 0) {
            this.revealBombs();

            this.props.finishGame();
          }
        }
      }
    });
  };

  winCheck = () => {
    let grid = this.state.grid;
    if (
      this.props.mines + this.props.openedCells >=
      this.props.columns * this.props.grid
    ) {
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
          let cell = grid[row][col];
          if (cell.hasMine && cell.isPressed) {
            return;
          }
        }
      }
      this.props.winning();
    }
  };

  revealBombs = () => {
    let grid = this.state.grid;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        let cell = grid[row][col];
        if (
          (cell.hasFlag && !cell.hasMine) ||
          (cell.hasMine && !cell.hasFlag)
        ) {
          cell.isPressed = true;
        }
      }
    }
  };
  countNeighbours = (cell) => {
    //Method based on the reference code, that was created in java
    let total = 0;
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          let rowOff = row + cell.y;
          let colOff = col + cell.x;
          if (
            rowOff < this.state.grid.length &&
            colOff < this.state.grid[0].length
          ) {
            if (
              this.state.grid[rowOff][colOff].hasMine &&
              !(row === 0 && col === 0)
            ) {
              total++;
            }
          }
        }
      }
    }
    return total;
  };

  countEmptyCell = (cell) => {
    //Spin through the neighbouring cells just as in the before method
    let grid = this.state.grid;
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          let rowOff = row + cell.y;
          let colOff = col + cell.x;
          if (
            rowOff < this.state.grid.length &&
            colOff < this.state.grid[0].length
          ) {
            if (
              !grid[rowOff][colOff].hasMine &&
              !grid[rowOff][colOff].isPressed
            ) {
              this.click(grid[rowOff][colOff]);
            }
          }
        }
      }
    }
  };

  flag = (cell) => {
    let grid = this.state.grid;
    if (
      this.props.game === "ended" ||
      this.props.game === "won" ||
      this.props.game !== "running"
    ) {
      return;
    } else if (!cell.isPressed) {
      cell.hasFlag = !cell.hasFlag;
      this.setState({ grid });
      this.props.changeFlagsNumber(cell.hasFlag ? -1 : 1);
    }
  };

  render() {
    //Create grid
    let grid = this.state.grid.map((row, index) => {
      return (
        <GridRow cells={row} key={index} click={this.click} flag={this.flag} />
      );
    });
    return <div className="grid">{grid}</div>;
  }
}

export default Grid;
