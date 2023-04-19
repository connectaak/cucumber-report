import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import CounterCart from '../components/CounterCart';
import useReportData from '../hooks/useReportData';

const CounterContainer = () => {
    const{counterData,totalReport}=useReportData()

    const classes=useStyles();
  
    return (
        <Box id="counter" className={classes.container}>
              <CounterCart  title="Total Reports" value={totalReport} />
            {
                counterData.map((item,index)=>(
                    <CounterCart key={index} title={item.title} value={item.value} />
                ))
            }
           <CounterCart title="Start Time" value="3/26/2023" time="20:30"/>
           {/* <CounterCart title="End Time" value="3/26/2023" time="20:30"/> */}
        </Box>
    );
};

export default CounterContainer;

const useStyles =makeStyles({
    container:{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"center",
    }
})