import React, { Component } from "react";
import "./index.css";

class WinningDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let winningDialog = (
      <div className="winningStyles">
        <p>test</p>
        <div>
          <button className="buttons" id="save">
            Save my time
          </button>
          <button className="buttons" id="newgame">
            New Game
          </button>
          <button className="buttons" id="cancel">
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
