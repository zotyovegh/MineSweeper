import React, { Component } from "react";
import "./index.css";

class Dialog extends Component {
  render() {
    let dialog = (
      <div className="dialogStyles">
        <tbody>
          <tr>
            <td>Game</td>
            <td colSpan="3">
              <button className="closeButton" onClick={this.props.onClose}>
                x
              </button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>Height</td>
            <td>Width</td>
            <td>Mines</td>
          </tr>
          <tr>
            <td>
              <input type="radio" value="beginner" name="hardness" /> Beginner
            </td>
            <td>9</td>
            <td>9</td>
            <td>10</td>
          </tr>

          <tr>
            <td>
              <input type="radio" value="intermediate" name="hardness" />{" "}
              Intermediate
            </td>
            <td>16</td>
            <td>16</td>
            <td>40</td>
          </tr>

          <tr>
            <td>
              <input type="radio" value="expert" name="hardness" /> Expert
            </td>
            <td>16</td>
            <td>30</td>
            <td>99</td>
          </tr>

          <tr>
            <td>
              <input type="radio" value="intermediate" name="hardness" /> Custom
            </td>
            <td>
              <input type="text" value="20" className="custom"></input>
            </td>
            <td>
              <input type="text" value="30" className="custom"></input>
            </td>
            <td>
              <input type="text" value="145" className="custom"></input>
            </td>
          </tr>
        </tbody>
        <button id="newGame">New Game</button>
      </div>
    );

    if (!this.props.isOpen) {
      dialog = null;
    }
    return <div>{dialog}</div>;
  }
}
export default Dialog;
