import { makeStyles } from '@mui/styles';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const DurationCompare = () => {
    const classes = useStyles();
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
      
    const COLORS = {passed:"#00C49F", failed:"#FF0000", skipped:"#0088FE",pending:"#FFBB28", undefined:"#B068F9"};
    return (
        <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height={400}>
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
      <Bar dataKey="steps" fill={COLORS["passed"]} />
      <Bar dataKey="scenarios" fill={COLORS["failed"]} />
      <Bar dataKey="features" fill={COLORS["pending"]} />
    </BarChart>
      </ResponsiveContainer>
        </div>
    );
};

export default DurationCompare;
const useStyles = makeStyles((theme) => ({
    root: {
      margin: '10px',
      padding: '10px',
    },
    chartContainer: {
      width: '100%',
      height: 400,
      marginTop: theme.spacing(2),
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    secondContainer:{
      display:"flex",
      alignItems:"center",
    },
   
  }));