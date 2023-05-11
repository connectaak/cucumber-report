import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'decayingtig',
    steps: 4,
    scenarios: 2,
    features: 1,
  },
  {
    name: 'decayingtongg',
    steps: 4,
    scenarios: 2,
    features: 1,
  },
];

const ReportChart = () => {
  return (
    <BarChart
      width={800}
      height={400}
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
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="steps" fill="#8884d8" />
      <Bar dataKey="scenarios" fill="#82ca9d" />
      <Bar dataKey="features" fill="#ffc658" />
    </BarChart>
  );
};

export default ReportChart;

