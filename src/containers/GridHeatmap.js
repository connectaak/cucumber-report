import { Box, Typography } from "@mui/material";
import React from "react";
import { HeatMapGrid } from "react-grid-heatmap";

const COLORS = {
  Passed: "#8fdc93",
  Failed: "#f29191",
  Skipped: "#83abf9",
  Pending: "#f3f68b",
  Undefined: "#f7b96f",
  Total: "#d3d1d2",
  Header: "#60cbf1",
};

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
  console.log(gridCompareData, "gridCompareData");
  return (
    <div
      style={{
        width: "100%",
        fontFamily: "sans-serif",
      }}
    >
      <Typography mt={5} my={5} align="center" variant="h2">
        HEATMAP GRID COMPARE
      </Typography>

      <HeatMapGrid
        data={data}
        xLabels={xLabels.slice(1)}
        cellRender={(x, y, value) => {
          const currentValue = value;
          if (data && data[y] && x > 0) {
            const previousValue = x > 0 ? data[y][x - 1] : null;
            console.log(currentValue, previousValue, "pr b");
          }
          return <Box>{value}</Box>;
        }}
        xLabelsStyle={(index) => ({
          fontSize: "14px",
          // background: "blue",
        })}
        yLabelsStyle={() => ({
          fontSize: ".65rem",
          textTransform: "uppercase",
          color: "#777",
        })}
        // cellStyle={(_x, _y, ratio, value) => {
        //   console.log(_x, _y, ratio, value);
        //   return {
        //     background: `rgb(12, 160, 44, ${ratio})`,
        //     fontSize: "16px",
        //     color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
        //     margin: "10px",
        //   };
        // }}
        cellStyle={(x, y, ratio, value) => {
          // Initial settings
          let cellBackground = "#ffffff"; // Default white background for cells
          let textColor = `rgb(0, 0, 0, ${ratio / 2 + 0.4})`;

          if (data && data[y] && x > 0) {
            // Ensuring 'data[y]' exists and 'x > 0' to avoid '-1' index
            const previousValue = data[y][x - 1];
            // console.log(previousValue, "balue");
            // Proceed with comparison only if previousValue is defined
            if (previousValue !== undefined) {
              if (value > previousValue) {
                cellBackground = COLORS.Passed; // Value increase
              } else if (value < previousValue) {
                cellBackground = COLORS.Failed; // Value decrease
              }
              // Unchanged values or specific conditions can be handled here
            }
          }

          // Customize for specific cell positions if necessary
          if (x === 0 || x === 1 || x === 2) {
            cellBackground = "#ffffff"; // Example: specific columns with unique background
          }

          return {
            background: cellBackground,
            fontSize: "16px",
            color: textColor,
            margin: "10px",
          };
        }}
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
