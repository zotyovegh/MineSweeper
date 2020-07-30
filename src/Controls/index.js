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
        <table className="header">
          <tbody>
            <tr>
              <td id="titles">Controls</td>
              <td colSpan="3">
                <button className="closeButton" onClick={this.props.onClose}>
                  x
                </button>
              </td>
            </tr>
          </tbody>
        </table>

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
          <li>Press Esc or click the reset to start a new game.</li>
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

/*
 <div className="titles">Mobile</div>
        <div className="list">
          <li>Tap an empty square to reveal it.</li>
          <li>Long-press an empty square to flag it.</li>
          <li>Tap a number to reveal its adjacent squares.</li>
        </div>
*/
