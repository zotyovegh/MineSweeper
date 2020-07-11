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
        <button id="save">Save</button>
      </div>
    );

    if (!this.props.isOpen) {
      winningDialog = null;
    }
    return <div>{winningDialog}</div>;
  }
}
export default WinningDialog;
