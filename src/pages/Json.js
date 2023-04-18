import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import ReactJson from 'react-json-view';
import useReportData from '../hooks/useReportData';

const Json = () => {
    const classes=useStyles();
    const{data}=useReportData()
    return (
        <Box className={classes.jsonViewerContainer}>
        <ReactJson  src={data} theme="monokai" />
        </Box>
    );
};

export default Json;
const useStyles =makeStyles({
    jsonViewerContainer:{
     margin:"10px" 
     
    }
 })