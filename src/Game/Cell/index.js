import React from "react";

const Cell = (props) => {
  let cell = () => {
    if (props.data.isPressed) {
      if (props.data.hasMine) {
        return (
          <div
            className="bomb cell"
            onClick={() => props.click(props.data)}
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          ></div>
        );
      } else if (props.data.minesAround === 0) {
        return (
          <div
            className="pressed cell"
            onClick={() => props.click(props.data)}
            onContextMenu={(e) => {
              e.preventDefault();
              props.flag(props.data);
            }}
          />
        );
      } else {
        return (
          <div
            className="pressed cell"
            onClick={() => props.click(props.data)}
            onContextMenu={(e) => {
              e.preventDefault();
              props.flag(props.data);
            }}
          >
            {props.data.minesAround}
          </div>
        );
      }
    } else if (props.data.hasFlag) {
      return (
        <div
          className="flagged cell"
          onClick={() => props.click(props.data)}
          onContextMenu={(e) => {
            e.preventDefault();
            props.flag(props.data);
          }}
        ></div>
      );
    } else {
      return (
        <div
          className="cell"
          onClick={() => props.click(props.data)}
          onContextMenu={(e) => {
            e.preventDefault();
            props.flag(props.data);
          }}
        />
      );
    }
  };
  return cell();
};

export default Cell;