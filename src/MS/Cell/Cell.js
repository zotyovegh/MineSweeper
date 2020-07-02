import React from "react";

const Cell = (props) => {
  let cell = () => {
    if (props.data.isPressed) {
      return <div className="opencell"></div>;
    } else {
      return <div className="cell"></div>;
    }
  };
  return cell();
};
export default Cell;
