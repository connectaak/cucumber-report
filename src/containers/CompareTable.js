import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { Fragment } from 'react';
import useReportData from '../hooks/useReportData';
import { getCompareTable } from '../utils/getCompareTable';

import { useTheme } from '@mui/material/styles';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}


const CompareTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const{compareData}=useReportData()
  const tableData= getCompareTable(compareData);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

    const COLORS = {Passed:"#8fdc93", Failed:"#f29191", Skipped:"#83abf9",Pending:"#f3f68b", Undefined:"#f7b96f", Total: "#d3d1d2",Header:"#60cbf1"};
      const header=["Features","Features No","Passed","Failed","Skipped","Undefined","Pending","Total","Passed","Failed","Total","Duration","Status"]
    const classes=useStyles();
    
    return (
        <Box  sx={{ margin:"20px"}}>
        <TableContainer>
            <Table
                        sx={{ minWidth: 850,border:"1px solid gray" }}
                        aria-labelledby="tableTitle"
                        size='small'>
            <TableHead>
            <TableRow>
           <TableCell  sx={{bgcolor:COLORS["Header"],padding:"0 130px"}} className={classes.border} />
           
            <TableCell sx={{bgcolor:COLORS["Header"]}} className={classes.border} colSpan={7} align="center"><Typography >Steps</Typography></TableCell>
            
            <TableCell sx={{bgcolor:COLORS["Header"]}} className={classes.border}colSpan={3} align="center"><Typography  >Scenarios</Typography> </TableCell>

            <TableCell sx={{bgcolor:COLORS["Header"]}} className={classes.border} colSpan={2} align="center"><Typography  >Features</Typography> </TableCell>
          </TableRow>
          <TableRow>
                {header.map(item=>(
                <TableCell className={`${classes.border} ${classes.width}`} sx={{bgcolor:COLORS[item]}}  align="center">  {item}</TableCell>
                ))}
        </TableRow>
        </TableHead>
        <TableBody>
         {  tableData.map((item, index) =>  (
                <Fragment>
                <TableRow>
                  <TableCell
                  className={classes.border}
                  rowSpan={item.length+1}
                  >
                  <Typography sx={{paddingLeft:"10px"}}>{item[0].name}</Typography>
                  </TableCell>
                </TableRow>
                {item.map((row,index)=>(
                    <TableRow>
                    <TableCell className={`${classes.border} ${classes.width}`}  align="center">{index+1}</TableCell>
                    <TableCell className={`${classes.border} ${classes.width}`}   sx={{bgcolor:!row.stepsPassed==0?COLORS["Passed"]:""}} align="center">{row.stepsPassed}</TableCell>
                    <TableCell className={`${classes.border} ${classes.width}`}  sx={{bgcolor:!row.stepsFailed==0?COLORS["Failed"]:""}} align="center">{row.stepsFailed}</TableCell>
                    <TableCell  className={`${classes.border} ${classes.width}`} sx={{bgcolor:!row.stepsSkipped==0?COLORS["Skipped"]:""}} align="center">{row.stepsSkipped}</TableCell>
                    <TableCell className={`${classes.border} ${classes.width}`} sx={{bgcolor:!row.stepsUndefined==0?COLORS["Undefined"]:""}} align="center">{row.stepsUndefined}</TableCell>
                    <TableCell className={`${classes.border} ${classes.width}`} sx={{bgcolor:!row.stepsPending==0?COLORS["Pending"]:""}} align="center">{row.stepsPending}</TableCell>
                    <TableCell className={`${classes.border} ${classes.width}`} sx={{bgcolor:!row.stepsTotal==0?COLORS["Total"]:""}} align="center">{row.stepsTotal}</TableCell>
                    <TableCell className={`${classes.border} ${classes.width}`} sx={{bgcolor:!row.stepsPassed==0?COLORS["Passed"]:""}} align="center">{row.scenariosPassed}</TableCell>
                    <TableCell className={`${classes.border} ${classes.width}`} sx={{bgcolor:!row.stepsFailed==0?COLORS["Failed"]:""}} align="center">{row.scenariosFailed}</TableCell>
                    <TableCell className={`${classes.border} ${classes.width}`} sx={{bgcolor:!row.stepsTotal==0?COLORS["Total"]:""}} align="center">{row.scenariosTotal}</TableCell>
                    <TableCell className={`${classes.border} ${classes.width}`} align="center">{row.duration}</TableCell>
                    <TableCell className={`${classes.border} ${classes.width}`} sx={{bgcolor:COLORS[row.status]}} align="center">{row.status}</TableCell>
                    </TableRow>
                ))}
                </Fragment>
                ))}

{/* <TableFooter> */}
          {/* <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow> */}
        {/* </TableFooter> */}
      </TableBody>
      </Table>
      </TableContainer>
      
      </Box>
    );
};

export default CompareTable;

const useStyles =makeStyles({
    border:{
      border:"1px solid black !important"
    },
    summaryItem:{
      fontWeight:"700 !important"
    },
    width:{
        // width:"100px"
    }
    })