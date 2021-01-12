import React from "react";

const Header = (props) => {
  let minutes = Math.floor(props.time / 60);
  let seconds = props.time - minutes * 60 || 0;
  let timeToSend = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

  return (
    <div className="game__header">
      <div className="game__flags">{props.flags}</div>
      <button className="game__reset" onClick={props.reset}>
        RESET
      </button>
      <div className="game__timer">{timeToSend}</div>
    </div>
  );
};

export default Header;
