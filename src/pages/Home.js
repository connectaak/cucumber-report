import React, { Fragment, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CounterContainer from '../containers/CounterContainer';
import PichartContainer from '../containers/PichartContainer';
import TrendchartContainer from '../containers/TrendchartContainer';
import TableTest from '../components/TableTest';
import useReportData from '../hooks/useReportData';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Home = () => {
  const { isSuccess } = useReportData();
  const classes = useStyles();
  const ref = useRef();

  const handlePdfExport = () => {
    html2canvas(ref.current, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', [ref.current.offsetWidth, ref.current.offsetHeight]);
      pdf.addImage(imgData, 'PNG', 0, 0, ref.current.offsetWidth, ref.current.offsetHeight);
      pdf.save('website-screen.pdf');
    });
  };

  return (
    <Fragment>
      {isSuccess ? (
        <div>
          <div className={classes.btnContainer}>
            <Button className={classes.btnBG} disableRipple onClick={handlePdfExport} variant="contained" component="span" endIcon={<DownloadIcon rounded />}>
              PDF
            </Button>
          </div>
          <div ref={ref} style={{ width: '100%', overflow: 'hidden' }}>
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
  btnContainer: {
    display: 'flex',
    justifyContent: 'end',
    position: 'fixed',
    // top: '75px',
    bottom: '20px',
    left:'5px',
    width: '100%',
    margin: '10px 0',
    zIndex: '999',
  },
  btnBG: {
    background: '#0476B5 !important',
  },
});
