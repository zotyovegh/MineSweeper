import React, { Component } from "react";
import "./index.css";

class WinningDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };

    this.onNameChange = this.onNameChange.bind(this);
  }

  onNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  render() {
    let winningDialog = (
      <div className="winningStyles">
        <div className="Message">
          Congratulations, you beat the game in {this.props.time} seconds!!!
        </div>
        <div>
          <input type="text" id="name" onChange={this.onNameChange}></input>
          <button className="buttons" id="save" onClick={this.onSaveTime}>
            Save my time
          </button>
        </div>

        <div>
          <button
            className="buttons"
            id="newgame"
            onClick={this.props.onNewGame}
          >
            New Game
          </button>
          <button className="buttons" id="cancel" onClick={this.props.onClose}>
            Cancel
          </button>
        </div>
      </div>
    );

    if (!this.props.isOpen) {
      winningDialog = null;
    }
    return <div>{winningDialog}</div>;
  }

  onSaveTime = () => {
    //Following values will be needed for the firebase saving
    console.log(this.state.name + " " + this.props.time);
  };
}
export default WinningDialog;
