import React, { Component } from "react";
import "./index.css";

class WinningDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /*
  TEMPORARILY NOT USED BUTTON
   <button className="buttons" id="save" onClick={this.props.onSaveTime}>
            Save my time
          </button>
          */

  render() {
    let winningDialog = (
      <div className="winningStyles">
        <div className="Message">
          Congratulations, you beat the game in {this.props.time} seconds!!!

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
}
export default WinningDialog;
