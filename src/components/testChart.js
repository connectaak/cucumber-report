import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const feature = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const scenarios = [
  { name: "SubPage A", uv: 1500, pv: 1000, amt: 500 },
  { name: "SubPage B", uv: 2000, pv: 1398, amt: 700 },
  { name: "SubPage C", uv: 800, pv: 9800, amt: 300 },
];
const steps = [
  { name: "SubPage A", uv: 1500, pv: 1000, amt: 500 },
  { name: "SubPage B", uv: 2000, pv: 1398, amt: 700 },
  { name: "SubPage C", uv: 800, pv: 9800, amt: 300 },
];

const DrillDownBarChart = () => {
  const [currentData, setCurrentData] = useState(feature);

  const handleClick = (data, index) => {
    setCurrentData(scenarios);
  };

  const handleBack = () => {
    setCurrentData(feature);
  };

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={currentData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" onClick={handleClick} />
          <Bar dataKey="uv" fill="#82ca9d" onClick={handleClick} />
        </BarChart>
      </ResponsiveContainer>
      {currentData !== feature && (
        <Button variant="contained" color="primary" onClick={handleBack}>
          Back
        </Button>
      )}
    </>
  );
};

export default DrillDownBarChart;