import React, { Component } from "react";
import "./index.css";

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radio: "custom",
      customrows: 2,
      customcolumns: 6,
      custommines: 2,
    };

    this.onChange = this.onChange.bind(this);
    this.onCustomRowChange = this.onCustomRowChange.bind(this);
    this.onCustomColumnChange = this.onCustomColumnChange.bind(this);
    this.onCustomMinesChange = this.onCustomMinesChange.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onCustomRowChange(e) {
    this.setState({
      customrows: e.target.value,
    });
  }
  onCustomColumnChange(e) {
    this.setState({
      customcolumns: e.target.value,
    });
  }
  onCustomMinesChange(e) {
    this.setState({
      custommines: e.target.value,
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
                  onChange={this.onChange}
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
                  onChange={this.onChange}
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
                  onChange={this.onChange}
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
                  onChange={this.onChange}
                  value="custom"
                  name="radio"
                  checked={this.state.radio === "custom"}
                />{" "}
                Custom
              </td>
              <td>
                <input
                  type="number"
                  value={this.state.customrows}
                  onChange={this.onCustomRowChange}
                  className="custom"
                ></input>
              </td>
              <td>
                <input
                  type="number"
                  value={this.state.customcolumns}
                  onChange={this.onCustomColumnChange}
                  className="custom"
                ></input>
              </td>
              <td>
                <input
                  type="number"
                  value={this.state.custommines}
                  onChange={this.onCustomMinesChange}
                  className="custom"
                ></input>
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

  checkNumber = (num, min, max) => {
    if (num > max) {
      return max;
    } else if (num < min) {
      return min;
    } else {
      return num;
    }
  };

  newGame = () => {
    if (this.state.radio === "beginner") {
      this.props.onNewGame(9, 9, 10);
    } else if (this.state.radio === "intermediate") {
      this.props.onNewGame(16, 16, 40);
    } else if (this.state.radio === "expert") {
      this.props.onNewGame(16, 30, 99);
    } else if (this.state.radio === "custom") {
      let crow = this.checkNumber(this.state.customrows, 2, 30);
      let ccol = this.checkNumber(this.state.customcolumns, 6, 45);
      let cmine = this.checkNumber(this.state.custommines, 3, 800);
      let cmineValid = crow * ccol > cmine ? cmine : crow * ccol - 1;
      console.log(cmineValid);
      this.setState({
        customrows: crow,
        customcolumns: ccol,
        custommines: cmineValid,
      });
      this.props.onNewGame(crow, ccol, cmineValid);
    }
  };
}
export default Dialog;
