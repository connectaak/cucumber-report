import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import * as React from 'react';
import { CSVLink } from 'react-csv';
import useReportData from '../hooks/useReportData';
import { cucumberCustomObject } from '../utils/getCucumberCustomObj';

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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

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

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Features',
  },
  {
    id: 'stepsPassed',
    numeric: true,
    disablePadding: false,
    label: 'Passed',
  },
  {
    id: 'stepsFailed',
    numeric: true,
    disablePadding: false,
    label: 'Failed',
  },
  {
    id: 'stepsSkipped',
    numeric: true,
    disablePadding: false,
    label: 'Skipped',
  },
  {
    id: 'stepsUndefined',
    numeric: true,
    disablePadding: false,
    label: 'Undefined',
  },
  {
    id: 'stepsPending',
    numeric: true,
    disablePadding: false,
    label: 'Pending',
  },
  {
    id: 'stepsTotal',
    numeric: true,
    disablePadding: false,
    label: 'Total',
  },
  {
    id: 'scenariosPassed',
    numeric: true,
    disablePadding: false,
    label: 'Passed',
  },
  {
    id: 'scenariosFailed',
    numeric: true,
    disablePadding: false,
    label: 'Failed',
  },
  {
    id: 'scenariosTotal',
    numeric: true,
    disablePadding: false,
    label: 'Total',
  },
  {
    id: 'duration',
    numeric: true,
    disablePadding: false,
    label: 'Duration',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
];

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'calories';
const DEFAULT_ROWS_PER_PAGE = 5;
const COLORS = {Passed:"#8fdc93", Failed:"#f29191", Skipped:"#83abf9",Pending:"#f3f68b", Undefined:"#f7b96f", Total: "#d3d1d2",Header:"#60cbf1"};

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };
const classes=useStyles()
  return (
    <TableHead>
        <TableRow>
           <TableCell  sx={{bgcolor:COLORS["Header"],padding:"0 130px"}} className={classes.border} />
           
            <TableCell sx={{bgcolor:COLORS["Header"]}} className={classes.border} colSpan={6} align="center"><Typography >Steps</Typography></TableCell>
            
            <TableCell sx={{bgcolor:COLORS["Header"]}} className={classes.border}colSpan={3} align="center"><Typography  >Scenarios</Typography> </TableCell>

            <TableCell sx={{bgcolor:COLORS["Header"]}} className={classes.border} colSpan={2} align="center"><Typography  >Features</Typography> </TableCell>
           
          
          </TableRow>
      <TableRow>
        {headCells.map((headCell,index) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.border}
            // colSpan={index==0&&"2"}
            sx={{bgcolor:COLORS[headCell.label]}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              // colSpan={headCell.id=="name"&&"2"}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}


export default function TableTest() {
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [visibleRows, setVisibleRows] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);
  const{data}=useReportData()
  
  const [search,setSearch]=React.useState("");
  const[rows,setRows]=React.useState([]);
  const [counterData,setCounterData]=React.useState([]);
  React.useEffect(()=>{
    const {gridData,counterData:cdata}= cucumberCustomObject(data)
    setRows(gridData)
    setCounterData(cdata)
    const filterData=gridData.filter(item=>item.name.includes(search))
    setRows(filterData);
    
   },[data, search])

  React.useEffect(() => {
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
    );
    setVisibleRows(rowsOnMount);
 
  }, [rows]);
  
  const handleRequestSort = React.useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(rows, getComparator(toggledOrder, newOrderBy));
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rows, rowsPerPage],
  );

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

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
        selected.slice(selectedIndex + 1),
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
        newPage * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
    //   const numEmptyRows =
    //     newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;

      // const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
      // setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, rows, rowsPerPage],
  );

  const handleChangeRowsPerPage = React.useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage,
      );

      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy, rows],
  );



  const isSelected = (name) => selected.indexOf(name) !== -1;

  const classes=useStyles();
  let csvFile=rows.map(item=>{
    return[item.name,
      item.stepsPassed,
      item.stepsFailed,
      item.stepsSkipped,
      item.stepsUndefined,
      item.stepsPending,
      item.stepsTotal,
      item.scenariosPassed,
      item.scenariosFailed,
      item.scenariosTotal,
      item.duration,
      item.status]
  })
  csvFile.unshift(["Features","stepsPassed","stepsFailed","stepsSkipped","stepsUndefined","stepsPending","stepsTotal","scenariosPassed","scenariosFailed","scenariosTotal","duration","status"])
  
let totalStepsPassed = 0;
let totalStepsFailed = 0;
let totalStepsSkipped = 0;
let totalStepsUndefined = 0;
let totalStepsPending = 0;
let totalStepsTotal = 0;
let totalScenariosPassed = 0;
let totalScenariosFailed = 0;
let totalScenariosTotal = 0;
let totalFeatures=0;


for (let i = 0; i < rows.length; i++) {
  const item = rows[i];
  totalStepsPassed += item.stepsPassed;
  totalStepsFailed += item.stepsFailed;
  totalStepsSkipped += item.stepsSkipped;
  totalStepsUndefined += item.stepsUndefined;
  totalStepsPending += item.stepsPending;
  totalStepsTotal += item.stepsTotal;
  totalScenariosPassed += item.scenariosPassed;
  totalScenariosFailed += item.scenariosFailed;
  totalScenariosTotal += item.scenariosTotal;
}
totalFeatures+=rows.length;
const gridSummary={totalStepsPassed,
   totalStepsFailed ,
totalStepsSkipped,
  totalStepsUndefined,
  totalStepsPending,
  totalStepsTotal,
  totalScenariosPassed, 
  totalScenariosFailed,
  totalScenariosTotal}
 
const totalStepsPassedPercent =((totalStepsPassed / totalStepsTotal) * 100).toFixed(0);
const totalStepsFailedPercent =((totalStepsFailed / totalStepsTotal) * 100).toFixed(0);
const totalStepsSkippedPercent =((totalStepsSkipped / totalStepsTotal) * 100).toFixed(0);
const totalStepsUndefinedPercent =((totalStepsUndefined / totalStepsTotal) * 100).toFixed(0);
const totalStepsPendingPercent =  ((totalStepsPending / totalStepsTotal) * 100).toFixed(0);

const totalScenariosPassedPercent =((totalScenariosPassed / totalScenariosTotal) * 100).toFixed(0);
const totalScenariosFailedPercent =((totalScenariosFailed / totalScenariosTotal) * 100).toFixed(0);
  const gridSummaryPercentage={
    totalStepsPassedPercent,
    totalStepsFailedPercent,
    totalStepsSkippedPercent,
    totalStepsUndefinedPercent,
    totalStepsPendingPercent,
    totalScenariosPassedPercent,
    totalScenariosFailedPercent,
    totalFeatures
  }


  return (
    <Box sx={{ margin:"20px"}}>
      {/* <CSVLink data={csvFile}>Download me</CSVLink>; */}
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <Box sx={{display:"flex", justifyContent:"space-between",alignItems:"center",margin:"10px 0"}}>
        <CSVLink data={csvFile}>Export CSV</CSVLink>;
          <TextField size='small' id="outlined-basic" onChange={(e)=>setSearch(e.target.value)} label="Search" variant="outlined" type='search' placeholder='Search by Feature name'/>
        </Box>
        <TableContainer>
          <Table
            sx={{ minWidth: 750,border:"1px solid gray" }}
            aria-labelledby="tableTitle"
            size='small'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              csvFile={csvFile}
            />
            <TableBody>
              {visibleRows
                ?
                 visibleRows?.map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                       
                        <TableCell
                       className={classes.border}
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                        <Typography sx={{paddingLeft:"10px"}}>{row.name}</Typography>
                        </TableCell>
                        <TableCell className={classes.border}   sx={{bgcolor:!row.stepsPassed==0?COLORS["Passed"]:""}} align="center">{row.stepsPassed}</TableCell>
                        <TableCell className={classes.border}  sx={{bgcolor:!row.stepsFailed==0?COLORS["Failed"]:""}} align="center">{row.stepsFailed}</TableCell>
                        <TableCell  className={classes.border} sx={{bgcolor:!row.stepsSkipped==0?COLORS["Skipped"]:""}} align="center">{row.stepsSkipped}</TableCell>
                        <TableCell className={classes.border} sx={{bgcolor:!row.stepsUndefined==0?COLORS["Undefined"]:""}} align="center">{row.stepsUndefined}</TableCell>
                        <TableCell className={classes.border} sx={{bgcolor:!row.stepsPending==0?COLORS["Pending"]:""}} align="center">{row.stepsPending}</TableCell>
                        <TableCell className={classes.border} sx={{bgcolor:!row.stepsTotal==0?COLORS["Total"]:""}} align="center">{row.stepsTotal}</TableCell>
                        <TableCell className={classes.border} sx={{bgcolor:!row.stepsPassed==0?COLORS["Passed"]:""}} align="center">{row.scenariosPassed}</TableCell>
                        <TableCell className={classes.border} sx={{bgcolor:!row.stepsFailed==0?COLORS["Failed"]:""}} align="center">{row.scenariosFailed}</TableCell>
                        <TableCell className={classes.border} sx={{bgcolor:!row.stepsTotal==0?COLORS["Total"]:""}} align="center">{row.scenariosTotal}</TableCell>
                        <TableCell className={classes.border} align="center">{row.duration}</TableCell>
                        <TableCell className={classes.border} sx={{bgcolor:COLORS[row.status]}} align="center">{row.status}</TableCell>
                      </TableRow>
                    );
                  })
                  
                       
                : null}
                   
                <TableRow>
                       
                       <TableCell rowSpan={10}  className={classes.border} >
                        <Typography   className={classes.summaryItem}>summary</Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem} >{gridSummary.totalStepsPassed}</Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem} >{gridSummary.totalStepsFailed}</Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem}>{gridSummary.totalStepsSkipped}</Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem} >{gridSummary.totalStepsUndefined}</Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem}>{gridSummary.totalStepsPending}</Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem}>{gridSummary.totalStepsTotal}</Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem} >{gridSummary.totalScenariosPassed}</Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography  className={classes.summaryItem}>{gridSummary.totalScenariosFailed}</Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem} >{gridSummary.totalScenariosTotal}</Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem} >{counterData[3]?.value}</Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem} >{totalFeatures}</Typography>
                        </TableCell>
                </TableRow>
            
                <TableRow>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem} >{gridSummaryPercentage.totalStepsPassedPercent}%</Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem} >{gridSummaryPercentage.totalStepsFailedPercent}%</Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem}>{gridSummaryPercentage.totalStepsSkippedPercent}%</Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem} >{gridSummaryPercentage.totalStepsUndefinedPercent}%</Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem}>{gridSummaryPercentage.totalStepsPendingPercent}%</Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem}></Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem} >{gridSummaryPercentage.totalScenariosPassedPercent}% </Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography  className={classes.summaryItem}>{gridSummaryPercentage.totalScenariosFailedPercent}%</Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem} ></Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem} ></Typography>
                        </TableCell>
                       <TableCell className={classes.border}   align="center">
                        <Typography className={classes.summaryItem} ></Typography>
                        </TableCell>
                </TableRow>
            
            
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
       
       
      </Paper>
     
    </Box>
  );
}
const useStyles =makeStyles({
border:{
  border:"1px solid black !important"
},
summaryItem:{
  fontWeight:"700 !important"
},

})