import React from "react";

const Header = (props) => {
  let minutes = Math.floor(props.time / 60);
  let seconds = props.time - minutes * 60 || 0;

  let timeToSend = minutes + ":" + seconds;
  return (
    <div className="grid-header">
      <div className="flags">{props.flags}</div>
      <button className="reset">RESET</button>
      <div className="timer">{timeToSend}</div>
    </div>
  );
};

export default Header;
