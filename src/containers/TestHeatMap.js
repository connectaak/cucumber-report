import { Box } from "@mui/material";
import React from "react";
import { HeatMapGrid } from "react-grid-heatmap";
import { NanosecondsConverter } from "../utils/nanosecondConverter";

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
    return r.Feature_Name.slice(0, 30);
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

  return (
    <div
      style={{
        width: "95%",
        overflowX: "auto",
        maxWidth: "95%",
        margin: "100px auto 0 auto",
      }}
    >
      <div style={{ width: "90%" }}>
        <HeatMapGrid
          data={data}
          xLabels={xLabels.slice(3)}
          yLabels={yLabels}
          cellRender={(x, y, value) => (
            <div title={`Pos(${x}, ${y}) = ${value}`}>
              {value && NanosecondsConverter(value).totalDuration}
            </div>
          )}
          xLabelsStyle={(index) => ({
            fontSize: "14px",
            height: "50px",

            border: "1px solid grey",
            width: "220px",
          })}
          yLabelsStyle={() => ({
            fontSize: "16px",
            textTransform: "uppercase",
            height: "50px",

            width: "280px",
            border: "1px solid grey",
          })}
          cellStyle={(_x, _y, ratio) => {
            if (ratio === 1) {
              return {
                background: "red",
                fontSize: "16px",
                height: "50px",

                borderRadius: "0",
                color: "white",
                border: "1px solid grey",
              };
            } else if (ratio === 0) {
              return {
                background: "white",
                fontSize: "16px",
                border: "1px solid grey",
                height: "50px",
                borderRadius: "0",

                color: "black",
              };
            } else {
              return {
                background: `rgb(12, 160, 44, ${1 - ratio})`,
                fontSize: "16px",
                border: "1px solid grey",
                height: "50px",
                borderRadius: "0",

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
    </div>
  );
};

export default TestHeatMap;
