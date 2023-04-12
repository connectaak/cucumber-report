import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button, FormControl, MenuItem, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CustomTooltip from './CustomTooltip';

const TrendChart = ({data:chartData,title,steps}) => {
  const COLORS = {passed:"#4caf50", failed:"#f44336", skipped:"#0088FE",pending:"#8609F5", undefined:"#9F1090"};
  const classes = useStyles();
  const [data, setData] = useState(chartData)
  const [duration, setDuration] = useState(data)
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedName,setSelectedName]=useState(" ")

  const handleChange = (event) => {
    setData(event.target.value);
    setDuration(event.target.value);
    setSelectedName(event.target.value[0].name,)
    console.log(event.target.value[0].name,"event.target.value")
  };

console.log(data,"data")
console.log(duration,"duration")

  const handleSort=()=>{
    // Duration Low To High
    const durationLowToHigh=[...data?.sort((a, b) => (a.duration > b.duration ? 1 : -1))]

    // Duration High To Low
   const durationHighToLow= [...data?.sort((a, b) => (a.duration > b.duration ? -1 : 1))]

   const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
   setSortOrder(newSortOrder);
   // Call your sort function based on the new sort order
   if (newSortOrder === 'asc') {
    setDuration(durationHighToLow);
   } else {
    setDuration(durationLowToHigh);
   }
  }

  const featureData = {};
  chartData.forEach(scenario => {
  if (!featureData[scenario.featureName]) {
    featureData[scenario.featureName] = {
      name: scenario.featureName,
      data: [],
    };
  }
  featureData[scenario.featureName].data.push(scenario);
});
  
  console.log( Object.values(featureData),"featureData")
  return (
    <Box className={classes.root}>
     <Box className={classes.header}>
     <Typography variant="h5" gutterBottom>
       {title}
      </Typography>
      <Box className={classes.secondContainer}>
      <Button variant="contained" color="success" onClick={handleSort} >
      Sort {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      </Button>
     {!steps&& <FormControl sx={{ m: 1, minWidth: 120,border:"none" }}  size="small">
        <Select
          value={data}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={chartData}>
            <em>All</em>
          </MenuItem>
       {title==="Scenarios"? Object.values(featureData).map((item,index)=>{

        return  <MenuItem key={index} value={item.data}><em>{item.name }</em></MenuItem>
       })
      :chartData.map((item,index)=>{
        return  <MenuItem key={index} value={[item]}>{ item.name}</MenuItem>    
      })
      }
        

        </Select>
      </FormControl>}
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
            <Tooltip content={<CustomTooltip />} />
           <Bar dataKey="duration"  >
            {duration.map((entry, index) => (
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
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    secondContainer:{
      display:"flex",
      alignItems:"center",
    }
  }));