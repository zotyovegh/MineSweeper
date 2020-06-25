import React, { Component } from "react";
import Cell from "./Cell/Cell";

import "./MineSweeper.css";

export default class MineSweeper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: [],
    };
  }

  componentDidMount() {
    const cells = [];
    for (let row = 0; row < 15; row++) {
      const currentRow = [];
      for (let col = 0; col < 15; col++) {
        currentRow.push([]);
      }
      cells.push(currentRow);
    }
    this.setState({ cells });
  }

  render() {
    const { cells } = this.state;
    console.log(cells);

    return (
      <div className="board">
        {cells.map((row, rowIdx) => {
          return (
            <div>
              {row.map((cell, cellIdx) => (
                <Cell></Cell>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}
