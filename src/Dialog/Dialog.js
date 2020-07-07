import React, { Component } from "react";
import "./index.css";

class Dialog extends Component {
  render() {
    let dialog = (
      <div className="dialogStyles">
        <button className="closeButton" onClick={this.props.onClose}>
          x
        </button>
        
      </div>
    );

    if (!this.props.isOpen) {
      dialog = null;
    }
    return <div>{dialog}</div>;
  }
}

export default Dialog;
