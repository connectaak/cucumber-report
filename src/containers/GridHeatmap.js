import React from "react";
import { HeatMapGrid } from "react-grid-heatmap";

const GridHeatmap = ({ gridCompareData }) => {
  const xLabels = gridCompareData[0] ? Object.keys(gridCompareData[0]) : null;
  console.log(gridCompareData, "hello");
  const yLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  // const yLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const data = new Array(yLabels.length)
    .fill(0)
    .map(() =>
      new Array(xLabels?.length)
        .fill(0)
        .map(() => Math.floor(Math.random() * 5 + 5))
    );

  return (
    <div
      style={{
        width: "100%",
        fontFamily: "sans-serif",
      }}
    >
      <HeatMapGrid
        data={data}
        xLabels={xLabels}
        yLabels={yLabels}
        // Reder cell with tooltip
        cellRender={(x, y, value) => (
          <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
        )}
        xLabelsStyle={(index) => ({
          color: index % 2 ? "transparent" : "#777",
          fontSize: ".65rem",
          background: "blue",
        })}
        yLabelsStyle={() => ({
          fontSize: ".65rem",
          textTransform: "uppercase",
          color: "#777",
        })}
        cellStyle={(_x, _y, ratio) => ({
          background: `rgb(12, 160, 44, ${ratio})`,
          fontSize: ".7rem",
          color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
        })}
        cellHeight="1.5rem"
        xLabelsPos="top"
        onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
        // yLabelsPos="right"
        // square
      />
    </div>
  );
};

export default GridHeatmap;
