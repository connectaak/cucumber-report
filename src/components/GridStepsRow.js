import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function GridStepsRow(props) {
    const { row } = props;

    const [open, setOpen] = React.useState(false);
  
    return (
   <>
    <TableRow>
    <TableCell>
      <IconButton
        aria-label="expand row"
        size="small"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <KeyboardArrowUpIcon />
        ) : (
          <KeyboardArrowDownIcon />
        )}
      </IconButton>
    </TableCell>
    <TableCell component="th" scope="row">
    {row.name}
    </TableCell>
    <TableCell>{row.status}</TableCell>
    <TableCell>{row.duration}</TableCell>
  </TableRow>
  <TableRow>
    <TableCell
      style={{ paddingBottom: 0, paddingTop: 0 }}
      colSpan={6}
    >
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <Box sx={{ margin: 1 }}>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            component="div"
          >
            Steps
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell>Steps</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {row.steps.map((stepsRow) => (
                <TableRow key={stepsRow.duration}>
                  <TableCell component="th" scope="row">
                   {stepsRow.name}
                  </TableCell>
                  <TableCell>
                  {stepsRow.status}
                  </TableCell>
                  <TableCell>
                    {stepsRow.duration}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </TableCell>
  </TableRow>
</>
    );
  }