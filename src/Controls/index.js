import React, { Component } from "react";
import "./index.css";

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let controls = (
      <div className="controlsStyles">
        <hi3>Desktop</hi3>
        <div className="list">
          <li>Left-click an empty square to reveal it.</li>
          <li>Right-click (or Ctrl+click) an empty square to flag it.</li>
          <li>
            Midde-click (or left+right click) a number to reveal its adjacent
            squares.
          </li>
          <li>
            Press space bar while hovering over a square to flag it or reveal
            its adjacent squares.
          </li>
          <li>Press F2 or click the smiley face to start a new game.</li>
        </div>

        <hi3>Mobile</hi3>
        <div className="list">
          <li>Tap an empty square to reveal it.</li>
          <li>Long-press an empty square to flag it.</li>
          <li>Tap a number to reveal its adjacent squares.</li>
        </div>
      </div>
    );

    if (!this.props.isOpen) {
      controls = null;
    }
    return <div>{controls}</div>;
  }
}
export default Controls;
