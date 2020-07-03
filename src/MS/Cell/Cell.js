import React from "react";

const Cell = (props) => {
  let cell = () => {
    if (props.data.isPressed) {
      if (props.data.minesAround === 0) {
        return (
          <div
            className="pressed cell"
            onClick={() => props.tryPress(props.data)}
          ></div>
        );
      } else if (props.data.hasMine) {
        return (
          <div
            className="pressed cell"
            onClick={() => props.tryPress(props.data)}
          ></div>
        );
      } else {
        return (
          <div
            className="pressed cell"
            onClick={() => props.tryPress(props.data)}
          >
            {props.data.minesAround}
          </div>
        );
      }
    } else {
      return (
        <div className="cell" onClick={() => props.tryPress(props.data)}></div>
      );
    }
  };
  return cell();
};
export default Cell;
