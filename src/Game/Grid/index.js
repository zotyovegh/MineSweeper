import React, { Component } from "react";
import GridRow from "../GridRow";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.createGrid(props),
    };
    this.isNew = false;
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.openedCells > nextProps.openedCells ||
      this.props.openedCells === 0
    ) {
      this.setState({
        rows: this.createGrid(nextProps),
      });
    }
  }

  createGrid = (props) => {
    let grid = [];

    for (let i = 0; i < props.rows; i++) {
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
      let row = Math.floor(Math.random() * props.rows);
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
      let rows = this.state.rows;
      let currentCell = rows[cell.y][cell.x];

      if (currentCell.hasMine && this.props.openedCells === 0) {
        let newRows = this.createGrid(this.props);
        this.setState(
          {
            rows: newRows,
          },
          () => {
            this.click(cell);
          }
        );
      } else {
        if (!currentCell.isPressed && !cell.hasFlag) {
          this.props.onCellInspect();
          currentCell.isPressed = true;
          currentCell.minesAround = countNeighbours;

          this.setState({ rows });

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

  revealBombs = () => {
    let grid = this.state.rows;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        let cell = grid[row][col];
        if (cell.hasMine && !cell.isPressed) {
          console.log("hey");
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
            rowOff < this.state.rows.length &&
            colOff < this.state.rows[0].length
          ) {
            if (
              this.state.rows[rowOff][colOff].hasMine &&
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
    let rows = this.state.rows;
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          let rowOff = row + cell.y;
          let colOff = col + cell.x;
          if (
            rowOff < this.state.rows.length &&
            colOff < this.state.rows[0].length
          ) {
            if (
              !rows[rowOff][colOff].hasMine &&
              !rows[rowOff][colOff].isPressed
            ) {
              this.click(rows[rowOff][colOff]);
            }
          }
        }
      }
    }
  };

  flag = (cell) => {
    let rows = this.state.rows;
    if (
      this.props.game === "ended" ||
      this.props.game === "won" ||
      this.props.game !== "running"
    ) {
      return;
    } else if (!cell.isPressed) {
      cell.hasFlag = !cell.hasFlag;
      this.setState({ rows });
      this.props.changeFlagsNumber(cell.hasFlag ? -1 : 1);
    }
  };

  render() {
    //Create rows
    let rows = this.state.rows.map((row, index) => {
      return (
        <GridRow cells={row} key={index} click={this.click} flag={this.flag} />
      );
    });
    return <div className="grid">{rows}</div>;
  }
}

export default Grid;
