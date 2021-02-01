import React, { useState } from "react";
import "./index.css";
import firebase from "../../firebase";

function WinningDialog(props) {
  const [name, setName] = useState("");

  console.log("WDTIME: " + props.time)
  console.log("WDLIMIT: " + props.limit)

  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onSaveTime = (e) => {
    firebase.firestore().collection(props.category).add({
      name: name,
      highscore: props.time,
    });
    props.onClose();
  };

  let winningDialog = (
    <div className="winning">
      <div className="winning__content">
        Congratulations, you beat the game in {props.time} seconds!!!
      </div>

      {(props.limit === -1 || props.limit > props.time) && (
        <div>
          <input
            type="text"
            className="winning__input"
            onChange={onNameChange}
          ></input>
          <button className="winning__save" onClick={onSaveTime}>
            Save my time
          </button>
        </div>
      )}

      <div>
        <button className="winning__newGame" onClick={props.onNewGame}>
          New Game
        </button>
        <button className="winning__cancel" onClick={props.onClose}>
          Cancel
        </button>
      </div>
    </div>
  );

  if (!props.isOpen) {
    winningDialog = null;
  }
  return <div>{winningDialog}</div>;
}
export default WinningDialog;
