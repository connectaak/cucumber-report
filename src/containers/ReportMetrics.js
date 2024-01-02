import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import CounterCart from "../components/CounterCart";
import useReportData from "../hooks/useReportData";
import totalReports from "../assets/images/icons/report.png";
import features from "../assets/images/icons/features.png";
import scenarios from "../assets/images/icons/scenarios.png";
import steps from "../assets/images/icons/steps.png";
import duration from "../assets/images/icons/duration.png";
import startTime from "../assets/images/icons/starttime.png";

const ReportMetrics = () => {
  const logos = [features, scenarios, steps, duration];
  const { counterData, totalReport } = useReportData();

  const classes = useStyles();

  return (
    <>
      <Typography mt={5} my={5} align="center" variant="h2">
        REPORT METRICS
      </Typography>
      <Box id="counter" className={classes.container}>
        <CounterCart
          title="Total Reports"
          value={totalReport}
          logo={totalReports}
        />
        {counterData.map((item, index) => (
          <CounterCart
            key={index}
            title={item.title}
            value={item.value}
            logo={logos[index]}
          />
        ))}
        <CounterCart
          title="Start Time"
          value="3/26/2023"
          time="20:30"
          logo={startTime}
        />
      </Box>
    </>
  );
};

export default ReportMetrics;

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
