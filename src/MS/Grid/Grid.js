import React, { Component } from "react";

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
          //One cell
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

      let cell = grid[row][col];

      console.log(cell);
    }
  };

  render() {
    return <div></div>;
  }
}

export default Grid;
