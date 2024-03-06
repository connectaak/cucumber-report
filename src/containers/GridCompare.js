import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import * as React from "react";
import { CSVLink } from "react-csv";
import useReportData from "../hooks/useReportData";
import { cucumberCustomObject } from "../utils/getCucumberCustomObj";
import { getSecondsToDuration } from "../utils/nanosecondConverter";
import { Link } from "react-router-dom";

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "calories";
const DEFAULT_ROWS_PER_PAGE = 5;
const COLORS = {
  Passed: "#8fdc93",
  Failed: "#f29191",
  Skipped: "#83abf9",
  Pending: "#f3f68b",
  Undefined: "#f7b96f",
  Total: "#d3d1d2",
  Header: "#60cbf1",
};

// Handaling Order...........
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Handle sorting.............
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// const headCells = [
//   {
//     id: "featureId",
//     numeric: false,
//     disablePadding: true,
//     label: "Id",
//   },
//   {
//     id: "featureName",
//     numeric: false,
//     disablePadding: true,
//     label: "Features",
//   },
//   {
//     id: "previousDuration",
//     numeric: true,
//     disablePadding: false,
//     label: "Previous Duration",
//   },
//   {
//     id: "newDuration",
//     numeric: true,
//     disablePadding: false,
//     label: "New Duration",
//   },
// ];

// Table Head.........
// function EnhancedTableHead(props) {
//   const { order, orderBy, onRequestSort } = props;
//   const createSortHandler = (newOrderBy) => (event) => {
//     onRequestSort(event, newOrderBy);
//   };
//   const classes = useStyles();
//   return (
//     <TableHead>
//       <TableRow>
//         {headCells.map((headCell, index) => (
//           <TableCell
//             key={headCell.id}
//             align="center"
//             padding={headCell.disablePadding ? "none" : "normal"}
//             sortDirection={orderBy === headCell.id ? order : false}
//             className={classes.border}
//             // colSpan={index==0&&"2"}
//             sx={{ bgcolor: COLORS["Header"] }}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//               // colSpan={headCell.id=="name"&&"2"}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

export default function GridSCompare({ gridCompareData }) {
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [visibleRows, setVisibleRows] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);
  // const { data } = useReportData();
  // const [durationTime, setDurationTime] = React.useState(1);
  // const [search, setSearch] = React.useState("");
  const [rows, setRows] = React.useState([]);

  // React.useEffect(() => {
  //   // const { gridData, counterData: cdata } = cucumberCustomObject(data);
  //   setRows(GridSCompare);
  //   setCounterData(GridSCompare.length);
  //   // const filterData = gridData.filter((item) => item.name.includes(search));
  //   // setRows(filterData);
  // }, [GridSCompare]);

  // React.useEffect(() => {
  //   let rowsOnMount = stableSort(
  //     rows,
  //     getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
  //   );

  //   rowsOnMount = rowsOnMount.slice(
  //     0 * DEFAULT_ROWS_PER_PAGE,
  //     0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
  //   );
  //   setVisibleRows(rowsOnMount);
  // }, [rows]);

  // const handleRequestSort = React.useCallback(
  //   (event, newOrderBy) => {
  //     const isAsc = orderBy === newOrderBy && order === "asc";
  //     const toggledOrder = isAsc ? "desc" : "asc";
  //     setOrder(toggledOrder);
  //     setOrderBy(newOrderBy);

  //     const sortedRows = stableSort(
  //       rows,
  //       getComparator(toggledOrder, newOrderBy)
  //     );
  //     const updatedRows = sortedRows.slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage
  //     );

  //     setVisibleRows(updatedRows);
  //   },
  //   [order, orderBy, page, rows, rowsPerPage]
  // );

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // const handleDurationTime = (e) => {
  //   const durationValue = e.target.value;
  //   const { gridData } = cucumberCustomObject(data);

  //   setDurationTime(durationValue);
  //   if (durationValue === 1) {
  //     setRows(gridData);
  //   } else if (durationValue === 2) {
  //     const newData = gridData.map((feature) => {
  //       return {
  //         ...feature,
  //         duration: getSecondsToDuration(feature.duration).totalMinutes, // You can replace this with your desired update logic
  //       };
  //     });

  //     setRows(newData);
  //   } else {
  //     const newData = gridData.map((feature) => {
  //       return {
  //         ...feature,

  //         duration: getSecondsToDuration(feature.duration).totalHours, // You can replace this with your desired update logic
  //       };
  //     });
  //     setRows(newData);
  //   }
  // };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = React.useCallback(
    (event, newPage) => {
      setPage(newPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage
      );

      setVisibleRows(updatedRows);
    },
    [order, orderBy, rows, rowsPerPage]
  );

  // const handleChangeRowsPerPage = React.useCallback(
  //   (event) => {
  //     const updatedRowsPerPage = parseInt(event.target.value, 10);
  //     setRowsPerPage(updatedRowsPerPage);

  //     setPage(0);

  //     const sortedRows = stableSort(rows, getComparator(order, orderBy));
  //     const updatedRows = sortedRows.slice(
  //       0 * updatedRowsPerPage,
  //       0 * updatedRowsPerPage + updatedRowsPerPage
  //     );

  //     setVisibleRows(updatedRows);

  //     // There is no layout jump to handle on the first page.
  //     setPaddingHeight(0);
  //   },
  //   [order, orderBy, rows]
  // );

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const classes = useStyles();

  // csv File data generating>>>>>>>
  // let csvFile = rows.map((item) => {
  //   return [
  //     item.name,
  //     item.stepsPassed,
  //     item.stepsFailed,
  //     item.stepsSkipped,
  //     item.stepsUndefined,
  //     item.stepsPending,
  //     item.stepsTotal,
  //     item.scenariosPassed,
  //     item.scenariosFailed,
  //     item.scenariosTotal,
  //     item.duration,
  //     item.status,
  //   ];
  // });
  // csvFile.unshift([
  //   "Features",
  //   "stepsPassed",
  //   "stepsFailed",
  //   "stepsSkipped",
  //   "stepsUndefined",
  //   "stepsPending",
  //   "stepsTotal",
  //   "scenariosPassed",
  //   "scenariosFailed",
  //   "scenariosTotal",
  //   "duration",
  //   "status",
  // ]);

  // Head Cells.........

  const headCells = gridCompareData[0] ? Object.keys(gridCompareData[0]) : null;
  return (
    <Box id="gridcompare" sx={{ margin: "20px" }}>
      <Typography mt={5} my={5} align="center" variant="h2">
        GRID DURATION COMPARE
      </Typography>

      <Paper
        sx={{
          width: "100%",
          mb: 2,
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.3)",
        }}
      >
        <TableContainer>
          <Table
            sx={{ minWidth: 750, border: "1px solid gray" }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <TableHead>
              <TableRow>
                {headCells?.slice(1)?.map((headCell, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    padding={headCell.disablePadding ? "none" : "normal"}
                    sortDirection={orderBy === headCell.id ? order : false}
                    className={classes.border}
                    sx={{ bgcolor: COLORS["Header"] }}
                  >
                    <TableSortLabel>{headCell}</TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {gridCompareData
                ? gridCompareData?.map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    // const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.featureId}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        {headCells?.slice(1)?.map((cell, index, array) => {
                          const currentValue = row[cell];
                          const previousValue =
                            index > 0 ? row[array[index - 1]] : null;

                          // Check if any of the values include "duration"

                          return (
                            <TableCell
                              key={index}
                              className={classes.border}
                              sx={{
                                paddingLeft: "10px",
                                bgcolor:
                                  index === 0 || index === 1 || index == 2
                                    ? "#ffffff"
                                    : previousValue > currentValue
                                    ? COLORS["Passed"]
                                    : previousValue < currentValue &&
                                      COLORS["Failed"],
                              }}
                            >
                              {currentValue}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                : null}

              {paddingHeight > 0 && (
                <TableRow
                  style={{
                    height: paddingHeight,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[
            { label: "All", value: rows.length + 1 },
            5,
            10,
            25,
          ]}
          component="div"
          // count={rows.length}
          // rowsPerPage={rowsPerPage}
          // page={page}
          // onPageChange={handleChangePage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </Box>
  );
}
const useStyles = makeStyles({
  border: {
    border: "1px solid black !important",
  },
  summaryItem: {
    fontWeight: "700 !important",
  },
});
