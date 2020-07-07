import React from "react";
import Cell from "../Cell"

const GridRow = (props) => {
  let cells = props.cells.map((data, index) => {
    return <Cell key={index} data={data} tryPress={props.tryPress} flag={props.flag}/>;
  });

  return <div className="row">{cells}</div>;
};

export default GridRow;
