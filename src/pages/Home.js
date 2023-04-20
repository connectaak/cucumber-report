import React, { Fragment, useRef } from 'react';
import Pdf from 'react-to-pdf';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CounterContainer from '../containers/CounterContainer';
import PichartContainer from '../containers/PichartContainer';
import TrendchartContainer from '../containers/TrendchartContainer';
import TableTest from '../components/TableTest';
import useReportData from '../hooks/useReportData';

const Home = () => {
  const { isSuccess } = useReportData();
  const classes = useStyles();
  const ref = useRef();

  return (
    <Fragment>
      {isSuccess ? (
        <div>
          <Pdf targetRef={ref} filename="code-example.pdf" scale={0.52} options={{ dpi: 600 }}>
            {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
          </Pdf>
          <div ref={ref} style={{ width: '100%', height: '100%' }}>
            <CounterContainer />
            <PichartContainer />
            <TrendchartContainer />
            <TableTest />
          </div>
        </div>
      ) : (
        <Box className={classes.container}>
          <Typography variant="h5" align="center">
            Please upload a cucumber json to see the report.
          </Typography>
        </Box>
      )}
    </Fragment>
  );
};

export default Home;

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '95vh',
  },
});
