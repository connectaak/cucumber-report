import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import ReportMetricCard from "../components/ReportMetricCard";
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
  // Create a new Date object
  const today = new Date();

  // Get the current date components
  const month = today.getMonth() + 1; // Month is zero-based, so add 1
  const day = today.getDate();
  const year = today.getFullYear();

  // Format the date as a string in MM/DD/YYYY format
  const formattedDate =
    (month < 10 ? "0" : "") +
    month +
    "/" +
    (day < 10 ? "0" : "") +
    day +
    "/" +
    year;
  const formattedTime = today.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <Typography mt={5} my={5} align="center" variant="h2">
        REPORT METRICS
      </Typography>
      <Box id="counter" className={classes.container}>
        <ReportMetricCard
          title="Reports Count"
          value1={totalReport}
          logo={totalReports}
        />
        {counterData.map((item, index) => (
          <ReportMetricCard
            key={index}
            title={item.title}
            value1={item.value}
            logo={logos[index]}
          />
        ))}
        <ReportMetricCard
          title="Start Time"
          value1={formattedDate}
          value2={formattedTime}
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
