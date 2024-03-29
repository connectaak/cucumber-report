import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PichartCart from "../components/PichartCart";
import useReportData from "../hooks/useReportData";
import { cucumberCustomObject } from "../utils/getCucumberCustomObj";

const ChartSummery = () => {
  const { data, setCounterData } = useReportData();
  const [chartData, setChartData] = useState([]);

  // Loading chart data...........
  useEffect(() => {
    const { chartData, counterData } = cucumberCustomObject(data);
    setCounterData(counterData);
    setChartData(chartData);
  }, [data, setCounterData]);

  return (
    <Box id="pichart" pt="80px">
      <Typography mt={5} my={5} align="center" variant="h2">
        CHART SUMMERY
      </Typography>
      <Box
        style={{
          display: "flex",
          flexWrap: "wrap ",
          gap: "10px",
          justifyContent: "center ",
          marginTop: "25px",
        }}
      >
        {chartData.map((item, index) => (
          <PichartCart key={index} data={item.data} title={item.title} />
        ))}
      </Box>
    </Box>
  );
};

export default ChartSummery;
