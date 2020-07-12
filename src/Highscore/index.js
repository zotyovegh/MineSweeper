import React, { Component } from "react";
import "./index.css";
import firebase from "../firebase";

firebase.firestore().collection("times").add({
  title: "Highscore",
  highscore: 30,
});

class Highscore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="highscore">Highscore...</div>
      </div>
    );
  }
}
export default Highscore;
