import React from "react";

const Cell = (props) => {
  let cell = () => {
    if (props.data.isPressed) {
      return (
        <div className="press cell" onClick={() => props.tryPress(props.data)}></div>
      );
    } else {
      return <div className="cell" onClick={() => props.tryPress(props.data)}></div>;
    }
  };
  return cell();
};
export default Cell;
