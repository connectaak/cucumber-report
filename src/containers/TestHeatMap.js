import React from "react";
import { HeatMapGrid } from "react-grid-heatmap";

// const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);

const TestHeatMap = ({ gridCompareData }) => {
  const uniqueKeys = new Set();

  gridCompareData.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      uniqueKeys.add(key);
    });
  });
  const xLabels = Array.from(uniqueKeys);

  const yLabels = gridCompareData.map((r) => {
    return r.Feature_Name;
  });
  yLabels.unshift("Report Name");

  const result = [];

  gridCompareData.forEach((obj) => {
    const newRow = xLabels.slice(3).map((key) => {
      return obj.hasOwnProperty(key) ? obj[key] : "";
    });
    result.push(newRow);
  });
  const data = result;
  const highestValue = Math.max(...data.flat());
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 100,
      }}
    >
      <HeatMapGrid
        data={data}
        xLabels={xLabels.slice(3)}
        yLabels={yLabels}
        cellRender={(x, y, value) => (
          <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
        )}
        xLabelsStyle={(index) => ({
          fontSize: "14px",
          margin: "0 10px",
        })}
        yLabelsStyle={() => ({
          fontSize: "14px",
          textTransform: "uppercase",
          margin: "5px",
        })}
        cellStyle={(_x, _y, ratio) => {
          if (ratio === 1) {
            return {
              background: "red",
              fontSize: "16px",
              margin: "10px",
              color: "white",
            };
          } else if (ratio === 0) {
            return {
              background: "white",
              fontSize: "16px",
              margin: "10px",
              color: "black",
            };
          } else {
            return {
              background: `rgb(12, 160, 44, ${1 - ratio})`,
              fontSize: "16px",
              margin: "10px",
              color: `rgb(0, 0, 0, ${(1 - ratio) / 2 + 0.4})`,
            };
          }
        }}
        cellHeight="2rem"
        xLabelsPos="top"
        onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
        yLabelsPos="left"
        // square
      />
    </div>
  );
};

export default TestHeatMap;
