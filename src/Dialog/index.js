import React, { Component } from "react";
import "./index.css";

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radio: this.checkCategory(props),
      customrows: 13,
      customcolumns: 13,
      custommines: 30,
      isCustomSelected: this.selectedCheck(props),
    };

    this.onChange = this.onChange.bind(this);
    this.onCustomRowChange = this.onCustomRowChange.bind(this);
    this.onCustomColumnChange = this.onCustomColumnChange.bind(this);
    this.onCustomMinesChange = this.onCustomMinesChange.bind(this);
  }

  selectedCheck = (props) => {
    if (
      (props.rows === 9 && props.columns === 9 && props.mines === 10) ||
      (props.rows === 16 && props.columns === 16 && props.mines === 40) ||
      (props.rows === 16 && props.columns === 30 && props.mines === 99)
    ) {
      return true;
    } else {
      return false;
    }
  };

  checkCategory = (props) => {
    if (props.rows === 9 && props.columns === 9 && props.mines === 10) {
      return "beginner";
    } else if (
      props.rows === 16 &&
      props.columns === 16 &&
      props.mines === 40
    ) {
      return "intermediate";
    } else if (
      props.rows === 16 &&
      props.columns === 30 &&
      props.mines === 99
    ) {
      return "expert";
    } else {
      return "custom";
    }
  };

  onChange(e) {
    console.log(e.target.value);
    if (e.target.value === "custom") {
      this.setState({
        isCustomSelected: false,
        [e.target.name]: e.target.value,
      });
    } else {
      this.setState({
        isCustomSelected: true,
        [e.target.name]: e.target.value,
      });
    }
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
              <td id="tableTitle">Difficulty</td>
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
                  id="begi"
                />{" "}
                <label htmlFor="begi">Beginner</label>
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
                  id="inter"
                />{" "}
                <label htmlFor="inter">Intermediate</label>
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
                  id="exp"
                />{" "}
                <label htmlFor="exp">Expert</label>
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
                  id="cust"
                />{" "}
                <label htmlFor="cust">Custom</label>
              </td>
              <td>
                <input
                  type="number"
                  value={this.state.customrows}
                  onChange={this.onCustomRowChange}
                  className="custom"
                  disabled={this.state.isCustomSelected}
                ></input>
              </td>
              <td>
                <input
                  type="number"
                  value={this.state.customcolumns}
                  onChange={this.onCustomColumnChange}
                  className="custom"
                  disabled={this.state.isCustomSelected}
                ></input>
              </td>
              <td>
                <input
                  type="number"
                  value={this.state.custommines}
                  onChange={this.onCustomMinesChange}
                  className="custom"
                  disabled={this.state.isCustomSelected}
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

  validateMine = (row, col, mine) => {
    if (row * col > mine) {
      return Math.round(mine * 10) / 10;
    } else {
      var num = Math.round(row * col * 0.8 * 10) / 10;
      return num < 800 ? num : 800;
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
      const crow = this.checkNumber(this.state.customrows, 2, 30);
      const ccol = this.checkNumber(this.state.customcolumns, 6, 45);
      const cmine = this.checkNumber(this.state.custommines, 3, 800);
      const cmineValid = this.validateMine(crow, ccol, cmine);
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
