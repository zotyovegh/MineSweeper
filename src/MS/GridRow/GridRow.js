import React from "react";
import GridCell from "../GridCell/GridCell"

const GridRow = (props) => {
  let cells = props.cells.map((data, index) => {
    return <GridCell key={index} data={data} />;
  });

  return <div className="row">{cells}</div>;
};

export default GridRow;
