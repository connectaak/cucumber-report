import { makeStyles } from "@mui/styles";
import React from "react";
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
import CustomTooltip from "./CustomTooltip";

const SummaryCompare = ({ data }) => {
  const classes = useStyles();
  const COLORS = {
    passed: "#00C49F",
    failed: "#FF0000",
    skipped: "#0088FE",
    pending: "#FFBB28",
    undefined: "#B068F9",
  };

  return (
    <div className={classes.chartContainer}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width="100%"
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
          <YAxis datakey="duration" />
          <Tooltip content={<CustomTooltip summaryCompare />} />
          <Bar dataKey="value">
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry?.status]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SummaryCompare;
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
