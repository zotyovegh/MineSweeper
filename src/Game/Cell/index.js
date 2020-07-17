import React from "react";
import bomb from "./bomb.png";
import flag from "./flag.png";
import wrongFlag from "./wronglyFlagged.png";

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
        if (props.data.hasFlag) {
          return (
            <div
              className="pressed cell"
              onClick={() => props.click(props.data)}
              onContextMenu={(e) => {
                e.preventDefault();
              }}
            >
              <img width="26" src={wrongFlag} />
            </div>
          );
        } else {
          return (
            <div
              className="pressed cell"
              onClick={() => props.click(props.data)}
              onContextMenu={(e) => {
                e.preventDefault();
              }}
            >
              <img width="26" src={bomb} />
            </div>
          );
        }
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
        >
          <img width="16" src={flag} />
        </div>
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
