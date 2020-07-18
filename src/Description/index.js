import React, { Component } from "react";
import "./index.css";

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let description = <div className="descriptionStyles">
      
    </div>;

    if (!this.props.isOpen) {
      description = null;
    }
    return <div>{description}</div>;
  }
}
export default Description;
