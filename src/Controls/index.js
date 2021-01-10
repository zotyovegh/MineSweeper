import React, { Component } from "react";
import "./index.css";

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let controls = (
      <div className="controls">
        <table className="controls__header">
          <tbody>
            <tr>
              <td id="controls__header__title">Controls</td>
              <td colSpan="3">
                <button className="controls__header__closer" onClick={this.props.onClose}>
                  x
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="controls__list">
          <li>Left-click an empty square to reveal it.</li>
          <li>Right-click an empty square to flag it.</li>
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
