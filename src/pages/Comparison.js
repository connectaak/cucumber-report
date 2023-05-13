import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { Fragment } from 'react';
import CompareTable from '../containers/CompareTable';
import SummaryCompare from '../containers/SummaryCompare';
import useReportData from '../hooks/useReportData';

const Comparison = () => {
    const { compareData } = useReportData();
    const classes=useStyles()
    return (
       <Fragment>
        {compareData.length>0?( <div>
            <SummaryCompare/>
            {/* <DurationCompare/> */}
            <CompareTable/>
            {/* <ComparisonTable/> */}
        </div>)
        :(<Box className={classes.container}>
         <Typography variant="h5" align="center">
           Please upload a cucumber json to see the Comparison report.
         </Typography>
       </Box>
    )}
       </Fragment>
    );
};

export default Comparison;
const useStyles = makeStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '95vh',
    },
})