import React, {  useState, } from "react";
import {
  SpringGrid,
  makeResponsive,
  enterExitStyle as enterExitStyles,
  layout,
} from "react-stonecutter";

const Grid = ({  columns, columnWidth, children, isResponsive }) => {
  // GRID ELEMENT ENTER EXIT STYLE SETUP
  const gridEnterExitStyle = enterExitStyles["simple"];
  const [stiffness] = useState(60);
  const [damping] = useState(14);

  const FinalGrid = (isResponsive) ? makeResponsive((SpringGrid), {
    maxWidth: 1920,
    minPadding: 100,
  }) : SpringGrid;

  return (
    <FinalGrid
      className="posts__grid"
      component="ul"
      columns={columns}
      columnWidth={columnWidth}
      gutterWidth={20}
      gutterHeight={20}
      layout={layout.pinterest}
      enter={gridEnterExitStyle.enter}
      entered={gridEnterExitStyle.entered}
      exit={gridEnterExitStyle.exit}
      perspective={600}
      springConfig={{
        stiffness,
        damping,
      }}>
      {children}
    </FinalGrid>
  );
};

export default Grid;
