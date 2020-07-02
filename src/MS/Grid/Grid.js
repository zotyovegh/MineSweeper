import React, { Component } from "react";
import GridRow from "../GridRow/GridRow";

class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: this.createGrid(props),
    };
  }

  createGrid = (props) => {
    let grid = [];

    for (let i = 0; i < props.rows; i++) {
      grid.push([]);
      for (let j = 0; j < props.columns; j++) {
        grid[i].push({
          x: i,
          y: j,
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
    console.table(grid);
    return grid;
  };

  render() {
    //Create rows

    let rows = this.state.rows.map((row, index) => {
      return <GridRow cells={row} key={index} />;
    });
    return <div className="grid">{rows}</div>;
  }

  try = (cell) => {
    //Display the number of neighboriing bombs or the bomb

    let rows = this.state.rows;
    let currentCell = rows[cell.x][cell.y];

    if (currentCell.hasMine && this.props.openedCells === 0) {
      console.log("cell already has mine, restart");
      let newRows = this.createGrid(this.props);
      this.setState(
        {
          rows: newRows,
        },
        () => {
          this.inspectCell(cell);
        }
      );
    } else {
      if (!currentCell.isPressed && !cell.hasFlag) {
        this.props.handleCellInspect();
        currentCell.isPressed = true;
      }
    }
  };

  countNeighbours = (cell) => {
    //Method based on the reference code, that was created in java
    let total = 0;
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        let i = row + cell.y;
        let j = col + cell.x;
        if (i < this.state.rows.length && j < this.state.rows[0].length) {
          if (this.state.rows[i][j].hasMine && !(row === 0 && col === 0)) {
            total++;
          }
        }
      }
    }
    return total;
  };
}

export default Grid;
