
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import useReportData from "../hooks/useReportData";
import { getGridData } from "../utils/getGridData";
import GridScenariosRow from "./GridScenariosRow";


const rows = [
  {
    feature: "Frozen yoghurt",
    duration: 159,
    status: "pass",
    scenarios: [
      {
        status: "pass",
        duration: "5000",
        steps: [
          { status: "hello", duration: "6000" },
          { status: "gelloo", duration: "5000" }
        ]
      },
      {
        status: "faild",
        duration: "3000",
        steps: [
          { status: "pass", duration: "6000" },
          { status: "faild", duration: "5000" }
        ]
      }
    ]
  },
  {
    feature: "Ice cream sandwich",
    duration: 235,
    status: "faild",
    scenarios: [
      {
        status: "pass",
        duration: "5000",
        steps: [
          { status: "pass", duration: "6000" },
          { status: "faild", duration: "5000" }
        ]
      },
      {
        status: "faild",
        duration: "3000",
        steps: [
          { status: "pass", duration: "6000" },
          { status: "faild", duration: "5000" }
        ]
      }
    ]
  }
];

export default function Grid() {
  const{data}=useReportData()
  const gridData=getGridData(data)
  const classes=useStyles()

  return (
    <TableContainer id="Grid"  className={classes.TableContainer}  component={Paper}>
      <Table  className={classes.table}  aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><Typography className={classes.text}>Features</Typography></TableCell>
            <TableCell align="right"><Typography  className={classes.text}>Status</Typography> </TableCell>
            <TableCell align="right"> <Typography  className={classes.text}>duration</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gridData.features.map((row) => (
            <GridScenariosRow key={row.feature} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const useStyles =makeStyles({
  table: {
    minWidth: 650,
    border:"1px solid gray",
    color:'primary.main',
  },
  TableContainer:{
    width:"100%",
    padding:"20px"
  },
 
  text:{
    fontWeight:"bold"
  }
})