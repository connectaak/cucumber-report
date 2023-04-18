import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { Fragment } from 'react';

// import GridContainer from '../container/GridContainer';
// import DrillDownChart from '../components/testChart';
import CounterContainer from '../containers/CounterContainer';
import DataGrid from '../containers/DataGrid';
import PichartContainer from '../containers/PichartContainer';
import TrendchartContainer from '../containers/TrendchartContainer';
import useReportData from '../hooks/useReportData';

const Home = () => {
    const {isSuccess}=useReportData()
  const classes=useStyles()
    return (
 <Fragment>
   {isSuccess?
    <>
    <CounterContainer/>
    <PichartContainer/>
    <TrendchartContainer/>
    {/* <DrillDownChart/> */}
    {/* <GridContainer/> */}
    {/* <Grid/> */}
    <DataGrid/>
 
    </>
    :
    <Box className={classes.container}>       
    <Typography variant="h5" align='center'>Please upload a cucumber json to see the report.</Typography>
    </Box>
    } 
    </Fragment> 
    );
};

export default Home;
const useStyles= makeStyles({
    container:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"95vh"
    }
  })