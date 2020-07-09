import React, { Component } from "react";
import "./index.css";

class Dialog extends Component {
  constructor(props) {
    super();
    this.state = {
      radio: "beginner",
    };

    this.onRadioChange = this.onRadioChange.bind(this);
  }

  onRadioChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    let dialog = (
      <div className="dialogStyles">
        <table>
          <tbody>
            <tr>
              <td id="tableTitle">Game</td>
              <td colSpan="3">
                <button className="closeButton" onClick={this.props.onClose}>
                  x
                </button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>Rows</td>
              <td>Columns</td>
              <td>Mines</td>
            </tr>
            <tr>
              <td>
                <input
                  type="radio"
                  onChange={this.onRadioChange}
                  value="beginner"
                  name="radio"
                  checked={this.state.radio === "beginner"}
                />{" "}
                Beginner
              </td>
              <td>9</td>
              <td>9</td>
              <td>10</td>
            </tr>

            <tr>
              <td>
                <input
                  type="radio"
                  onChange={this.onRadioChange}
                  value="intermediate"
                  name="radio"
                  checked={this.state.radio === "intermediate"}
                />{" "}
                Intermediate
              </td>
              <td>16</td>
              <td>16</td>
              <td>40</td>
            </tr>

            <tr>
              <td>
                <input
                  type="radio"
                  onChange={this.onRadioChange}
                  value="expert"
                  name="radio"
                  checked={this.state.radio === "expert"}
                />{" "}
                Expert
              </td>
              <td>16</td>
              <td>30</td>
              <td>99</td>
            </tr>

            <tr>
              <td>
                <input
                  type="radio"
                  onChange={this.onRadioChange}
                  value="custom"
                  name="radio"
                  checked={this.state.radio === "custom"}
                />{" "}
                Custom
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
        </table>
        <button id="newGame" onClick={this.newGame}>
          New Game
        </button>
      </div>
    );

    if (!this.props.isOpen) {
      dialog = null;
    }
    return <div>{dialog}</div>;
  }

  newGame = () => {
    if (this.state.radio === "beginner") {
      this.props.onNewGame(9, 9, 10);
    } else if (this.state.radio === "intermediate") {
      this.props.onNewGame(16, 16, 40);
    } else if (this.state.radio === "expert") {
      this.props.onNewGame(16, 30, 99);
    }
  };
}
export default Dialog;
