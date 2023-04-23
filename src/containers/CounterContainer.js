import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import CounterCart from '../components/CounterCart';
import useReportData from '../hooks/useReportData';
import logo1 from '../assets/images/icons/report.png'
import logo2 from '../assets/images/icons/features.png'
import logo3 from '../assets/images/icons/scenarios.png'
import logo4 from '../assets/images/icons/steps.png'
import logo5 from '../assets/images/icons/duration.png'
import logo6 from '../assets/images/icons/starttime.png'

const CounterContainer = () => {
    const logos = [logo2,logo3,logo4,logo5]
    const{counterData,totalReport}=useReportData()

    const classes=useStyles();
  
    return (
        <Box id="counter" className={classes.container}>
              <CounterCart  title="Total Reports" value={totalReport} logo={logo1} />
            {
                counterData.map((item,index)=>(
                    <CounterCart key={index} title={item.title} value={item.value} logo={logos[index]} />
                ))
            }
           <CounterCart title="Start Time" value="3/26/2023" time="20:30" logo={logo6}/>
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