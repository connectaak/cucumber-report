import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Cell, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

const TrendChart = ({data,title}) => {
  const COLORS = {passed:"#4caf50", failed:"#f44336", skipped:"#0088FE",pending:"#8609F5", undefined:"#9F1090"};
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h5" gutterBottom>
       {title}
      </Typography>
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
            <Tooltip />
           <Bar dataKey="duration"  >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.status]} />
            ))}
            </Bar> 
          </BarChart>
    </ResponsiveContainer>
      </div>
    </Box>
  )
}

export default TrendChart

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
  }));