import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { Fragment } from 'react';

const CompareTable = ({data:tableData}) => {
    const COLORS = {Passed:"#8fdc93", Failed:"#f29191", Skipped:"#83abf9",Pending:"#f3f68b", Undefined:"#f7b96f", Total: "#d3d1d2",Header:"#60cbf1"};
      const header=["Features","Features No","Passed","Failed","Skipped","Undefined","Pending","Total","Passed","Failed","Total","Duration","Status"]
    const classes=useStyles();
    
    return (
        <Paper  sx={{ margin:"20px"}}>
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
                    <TableCell className={`${classes.border} ${classes.width}`}  align="center">{row.file}</TableCell>
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
      </TableBody>
      </Table>
      </TableContainer>
      
      </Paper>
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