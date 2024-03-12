import React from "react";
import { HeatMapGrid } from "react-grid-heatmap";

const GridHeatmap = ({ gridCompareData }) => {
  const uniqueKeys = new Set();

  gridCompareData.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      uniqueKeys.add(key);
    });
  });
  const xLabels = Array.from(uniqueKeys);

  const result = [];

  gridCompareData.forEach((obj) => {
    const newRow = xLabels.slice(1).map((key) => {
      return obj.hasOwnProperty(key) ? obj[key] : "";
    });
    result.push(newRow);
  });

  const data = result;

  return (
    <div
      style={{
        width: "100%",
        fontFamily: "sans-serif",
      }}
    >
      <HeatMapGrid
        data={data}
        xLabels={xLabels.slice(1)}
        // yLabels={yLabels}
        // Reder cell with tooltip
        cellRender={(x, y, value) => {
          console.log(x, y, value);
          return <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>;
        }}
        // xLabelsStyle={(index) => ({
        //   color: index % 2 ? "transparent" : "#777",
        //   fontSize: ".65rem",
        //   // background: "blue",
        // })}
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
