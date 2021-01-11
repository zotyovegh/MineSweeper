import React, { Component } from "react";
import "./index.css";
import firebase from "../../firebase";

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
      <div className="winning">
        <div className="winning__content">
          Congratulations, you beat the game in {this.props.time} seconds!!!
        </div>

        {(this.props.limit === -1 || this.props.limit > this.props.time) && (
          <div>
            <input type="text" id="name" onChange={this.onNameChange}></input>
            <button
              className="winning__buttons"
              id="save"
              onClick={this.onSaveTime}
            >
              Save my time
            </button>
          </div>
        )}

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

  onSaveTime = (e) => {
    firebase.firestore().collection(this.props.category).add({
      name: this.state.name,
      highscore: this.props.time,
    });
    this.props.onClose();
  };
}
export default WinningDialog;
