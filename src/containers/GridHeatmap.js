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
          console.log(x, y, value);
          return (
            <Box
              sx={{
                paddingLeft: "10px",
                // bgcolor:
                //   index === 0 || index === 1 || index == 2
                //     ? "#ffffff"
                //     : previousValue > currentValue
                //     ? COLORS["Passed"]
                //     : previousValue < currentValue && COLORS["Failed"],
              }}
            >
              {value}
            </Box>
          );
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
        cellStyle={(_x, _y, ratio) => ({
          background: `rgb(12, 160, 44, ${ratio})`,
          fontSize: "16px",
          color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
          margin: "10px",
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
