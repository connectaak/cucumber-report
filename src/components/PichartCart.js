import { Box, CardContent, Typography } from "@material-ui/core";
import { Switch } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PichartFooter from "./PichartFooter";

const COLORS = {
  passed: "#00C49F",
  failed: "#FF0000",
  skipped: "#0088FE",
  pending: "#FFBB28",
  undefined: "#B068F9",
};
const PichartCart = ({ title, data }) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const total = parseInt(
    data?.reduce(
      (accumulator, currentValue) => accumulator + currentValue?.value,
      0
    )
  );

  const passed = parseInt(data.find((item) => item.name === "passed")?.value);
  const failed = parseInt(data.find((item) => item.name === "failed")?.value);

  const successfulPercentage = Math.round((passed / total) * 100);
  const failedPercentage = Math.round((failed / total) * 100);
  const othersPercentage = Math.round(
    100 - (successfulPercentage + failedPercentage)
  );

  return (
    <Box className={classes.card}>
      <Box className={classes.header}>
        <Typography className={classes.title} variant="h5" component="h2">
          {title}
        </Typography>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Box>
      <CardContent>
        <Box
          className={
            checked === true
              ? classes.chartContainer
              : classes.chartContainerColumn
          }
        >
          {checked ? (
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Pie>
            </PieChart>
          ) : (
            <BarChart
              width={400}
              height={200}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis datakey="value" />
              <Tooltip />
              <Bar dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Bar>
            </BarChart>
          )}

          {/* right box  start*/}
          <Box className={!checked && classes.chartTextContainerRow}>
            {data.map((entry, index) => (
              <Box className={classes.chartTextContainer} key={`data-${index}`}>
                <Box
                  style={{
                    width: 26,
                    height: 26,
                    backgroundColor: COLORS[entry.name],
                    marginRight: 2,
                  }}
                />
                <Box>
                  <Typography className={classes.chartBoldText}>
                    {entry.name}: {entry.value}
                    <br />
                  </Typography>

                  <Typography className={classes.chartNormalText}>
                    {/* {((entry.value / total) * 100).toFixed(2)}% */}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          {/* right box end */}
        </Box>
      </CardContent>
      <Box className={classes.footer}>
        <PichartFooter
          title="Successful"
          value={isNaN(successfulPercentage) ? 0 : successfulPercentage}
          color={COLORS["passed"]}
        />
        <PichartFooter
          title="Failed"
          value={isNaN(failedPercentage) ? 0 : failedPercentage}
          color={COLORS["failed"]}
        />
        <PichartFooter
          title="Others"
          value={isNaN(othersPercentage) ? 0 : othersPercentage}
          color="#9e9e9e"
        />
      </Box>
    </Box>
  );
};

export default PichartCart;

const useStyles = makeStyles((theme) => ({
  card: {
    width: "430px !important",
    height: "420px !important",
    padding: "10px !important",
    borderRadius: 10,
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.3) !important",
    position: "relative !important",
  },
  header: {
    display: "flex !important",
    justifyContent: "space-between !important",
    alignItems: "center !important",
    marginBottom: "20px !important",
  },
  chartContainerColumn: {
    display: "flex !important",
    justifyContent: "space-between !important",
    flexDirection: "column !important",
    alignItems: "center !important",
  },
  chartContainer: {
    display: "flex !important",
    justifyContent: "space-between !important",

    alignItems: "center !important",
  },

  title: {
    fontSize: "25px !important",
    fontWeight: "400 !important",
    lineHeight: "22px !important",
    marginBottom: "20px !important",
    backgroundColor: "#FCD73C !important",
    color: "black !important",
    borderRadius: "5px !important",
    padding: "5px 15px !important",
    display: "inline-block !important",
  },

  chartTextContainer: {
    display: "flex !important",
    alignItems: "center !important",
    margin: "5px 0 !important",
  },
  chartTextContainerRow: {
    display: "flex !important",
    justifyContent: "center !important",
    gap: "8px",
    alignItems: "center !important",
    margin: "2px 0 !important",
    flexWrap: "wrap !important",
  },

  chartBoldText: {
    fontSize: "16px !important",
    lineHeight: "20px !important",
    fontWeight: "600 !important",
  },

  chartNormalText: {
    fontSize: "12px !important",
    lineHeight: "14px !important",
  },
  footer: {
    display: "flex !important",
    justifyContent: "space-between !important",
    alignItems: "center !important",
    position: "absolute !important",
    bottom: "0 !important",
    left: "0 !important",
    right: "0 !important",
    padding: "8px !important",
  },
}));
