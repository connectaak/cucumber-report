import { Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import GridHeader from '../components/GridHeader';
import GridRow from '../components/GridRow';
import GirdSubHeader from '../components/GridSubHeader';
import SummaryRow from '../components/SummaryRow';
import useReportData from '../hooks/useReportData';
import { cucumberCustomObject } from '../utils/getCucumberCustomObj';

const DataGrid = () => {
  const classes = useStyles();
  const{data}=useReportData()
  const {gridData}= cucumberCustomObject(data)
  console.log(gridData,"grid Data")
    return (
        <Box id="grid" className={classes.subContainer}>
        <Grid className={classes.tableContainer} container>
        <GridHeader/>
        <GirdSubHeader/>
       {
          gridData.map((item,index)=>{
            return <GridRow key={index} data={item}/>
          })
       }
        <SummaryRow data={gridData}/>
        </Grid>
        </Box>
       
    );
};
const useStyles =makeStyles({
 
  subContainer:{
    overflowX:"scroll !important",
    margin:"20px"
  },
  tableContainer:{
    border:"1px solid black !important",
    textAlign:"center",
    minWidth: 950, 
  },
  text:{
    fontWeight:"bold !important",
    fontSize:"14px !important"
},
pieTitle:{
  fontWeight:"bold !important",
  fontSize:"16px !important",
  textAlign:"center"
}
})

export default DataGrid;