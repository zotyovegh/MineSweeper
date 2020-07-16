import React from "react";

const Cell = (props) => {
  var color = "";
  if (props.data.minesAround === 1) {
    color = "blue";
  } else if (props.data.minesAround === 2) {
    color = "green";
  } else if (props.data.minesAround === 3) {
    color = "red";
  } else if (props.data.minesAround === 4) {
    color = "purple";
  } else if (props.data.minesAround === 5) {
    color = "maroon";
  } else if (props.data.minesAround === 6) {
    color = "turquoise";
  } else if (props.data.minesAround === 7) {
    color = "black";
  } else if (props.data.minesAround === 8) {
    color = "gray";
  }
  var style = { color: color };
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
            style={style}
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
