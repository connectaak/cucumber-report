import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DurationSummeryTooltip from "./DurationSummeryTooltip";

const TrendChart = ({ data: chartData, title, steps }) => {
  const COLORS = {
    passed: "#00C49F",
    failed: "#FF0000",
    skipped: "#0088FE",
    pending: "#FFBB28",
    undefined: "#B068F9",
  };
  const classes = useStyles();
  // const [data, setData] = useState(chartData)
  const [duration, setDuration] = useState(chartData);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedType, setSelectedType] = useState();

  useEffect(() => {
    setDuration(chartData);
  }, [chartData]);

  const handleChange = (event) => {
    // setData(event.target.value.data);
    setDuration(event.target.value.data);
    setSelectedType(event.target.value);
  };
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

  const featureData = {};
  chartData.forEach((scenario) => {
    if (!featureData[scenario.featureName]) {
      featureData[scenario.featureName] = {
        name: scenario.featureName,
        data: [],
      };
    }
    featureData[scenario.featureName].data.push(scenario);
  });

  const allData = { name: "all", data: chartData };
  console.log(duration, "durantionnn");
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Box className={classes.secondContainer}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#0476B5" }}
            onClick={handleSort}
          >
            Sort {sortOrder === "asc" ? "Ascending" : "Descending"}
          </Button>
          {!steps && (
            <FormControl
              sx={{ m: 1, minWidth: 120, border: "none" }}
              size="small"
            >
              <InputLabel id="demo-simple-select-label">All</InputLabel>
              <Select
                value={selectedType}
                onChange={handleChange}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                inputProps={{ "aria-label": "Without label" }}
                renderValue={(selected) => {
                  if (selected.name === "all") {
                    return <em>All</em>;
                  } else {
                    return selected.name;
                  }
                }}
              >
                <MenuItem value={allData}>
                  <em>All</em>
                </MenuItem>
                {title === "Scenarios"
                  ? Object.values(featureData).map((item, index) => {
                      const data = { name: item.name, data: item.data };
                      return (
                        <MenuItem key={index} value={data}>
                          <em>{item.name}</em>
                        </MenuItem>
                      );
                    })
                  : chartData.map((item, index) => {
                      const data = { name: item.name, data: [item] };
                      return (
                        <MenuItem key={index} value={data}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
              </Select>
            </FormControl>
          )}
          <FormControl
            sx={{ m: 1, minWidth: 200, border: "none" }}
            size="small"
          >
            <InputLabel id="demo-simple-select-label-1">
              Duration in Second
            </InputLabel>
            <Select
              // value={selectedType}
              // onChange={handleChange}
              labelId="demo-simple-select-label-1"
              id="demo-simple-select"
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem>
                <em>All</em>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width="100%"
            height={400}
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
            <Bar dataKey="duration">
              {duration.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.status]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Box>
  );
};

export default TrendChart;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px",
    padding: "10px",
  },
  chartContainer: {
    width: "100%",
    height: 400,
    marginTop: theme.spacing(2),
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
