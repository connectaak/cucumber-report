import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DurationSummeryTooltip from "./DurationSummeryTooltip";
import { getSecondsToDuration } from "../utils/nanosecondConverter";

const TrendChart = ({ data: chartData, title }) => {
  const COLORS = {
    passed: "#00C49F",
    failed: "#FF0000",
    skipped: "#0088FE",
    pending: "#FFBB28",
    undefined: "#B068F9",
  };
  const classes = useStyles();

  const [duration, setDuration] = useState(chartData);
  const [sortOrder, setSortOrder] = useState("asc");

  const [durationTime, setDurationTime] = useState(1);

  useEffect(() => {
    setDuration(chartData);
  }, [chartData]);

  const handleDurationTime = (e) => {
    const durationValue = e.target.value;
    setDurationTime(durationValue);
    if (durationValue === 1) {
      setDuration(chartData);
    } else if (durationValue === 2) {
      const newData = chartData.map((feature) => {
        return {
          ...feature,
          tooltipVlue: feature.duration,
          duration: getSecondsToDuration(feature.duration).totalMinutes, // You can replace this with your desired update logic
        };
      });
      setDuration(newData);
    } else {
      const newData = chartData.map((feature) => {
        return {
          ...feature,
          tooltipVlue: feature.duration,
          duration: getSecondsToDuration(feature.duration).totalHours, // You can replace this with your desired update logic
        };
      });
      setDuration(newData);
    }
  };
  // const handleChange = (event) => {
  // setData(event.target.value.data);
  // setDuration(event.target.value.data);
  // setSelectedType(event.target.value);
  // };
  const handleSort = () => {
    // Duration Low To High
    const durationLowToHigh = [
      ...duration?.sort((a, b) => (a.duration > b.duration ? 1 : -1)),
    ];

    // Duration High To Low
    const durationHighToLow = [
      ...duration?.sort((a, b) => (a.duration > b.duration ? -1 : 1)),
    ];

    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    // Call your sort function based on the new sort order
    if (newSortOrder === "asc") {
      setDuration(durationHighToLow);
    } else {
      setDuration(durationLowToHigh);
    }
  };

  // const featureData = {};
  // chartData?.forEach((scenario) => {
  //   if (!featureData[scenario.featureName]) {
  //     featureData[scenario.featureName] = {
  //       name: scenario.featureName,
  //       data: [],
  //     };
  //   }
  //   featureData[scenario.featureName].data.push(scenario);
  // });

  // const allData = { name: "all", data: chartData };
  if (!duration) return;
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Box className={classes.secondContainer}>
          <Box>
            <Typography variant="formlabel">Features Sort </Typography>
            <Button
              variant="contained"
              style={{ backgroundColor: "#0476B5", display: "block" }}
              onClick={handleSort}
            >
              Sort {sortOrder === "asc" ? "Ascending" : "Descending"}
            </Button>
          </Box>

          <FormControl
            sx={{ m: 1, minWidth: 200, border: "none" }}
            size="small"
          >
            {/* <InputLabel id="demo-simple-select-label-1">
              Duration Time
            </InputLabel> */}
            <Typography variant="formlabel">Duration Time</Typography>
            <Select
              value={durationTime}
              onChange={handleDurationTime}
              labelId="demo-simple-select-label-1"
              id="demo-simple-select"
              // sx={{
              //   border: "1px solid grey",
              //   "& fieldset": { border: "none" },
              // }}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={1}>
                <em>Second</em>
              </MenuItem>
              <MenuItem value={2}>
                <em>Minute</em>
              </MenuItem>
              <MenuItem value={3}>
                <em>Hour</em>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <div className={classes.chartContainer}>
        <div style={{ width: "100%", overflowX: "auto" }}>
          <BarChart
            width={duration.length < 20 ? 1700 : duration.length * 70}
            height={350}
            data={duration}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis datakey="duration" />
            <Tooltip content={<DurationSummeryTooltip />} />
            <Bar dataKey="duration" barSize={30}>
              {duration.map((entry, index) => (
                <Cell
                  width={50}
                  key={`cell-${index}`}
                  fill={COLORS[entry.status]}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
    </Box>
  );
};

export default TrendChart;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px",
    padding: "10px",
    borderRadius: 10,
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.3) !important",
  },
  chartContainer: {
    width: "100%",
    height: 400,
    // width: '100%',
    // height: "300px",
    // overflowX: "auto",
    // marginTop: theme.spacing(2),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  secondContainer: {
    display: "flex",
    alignItems: "center",
  },
}));
