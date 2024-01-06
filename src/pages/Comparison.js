import { CheckCircle } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { Fragment, useState } from "react";
import CompareTable from "../containers/CompareTable";
import SummaryCompare from "../containers/SummaryCompare";
import useReportData from "../hooks/useReportData";
import { getCompareChart } from "../utils/getCompareChart";
import { getCompareTable } from "../utils/getCompareTable";

const Comparison = () => {
  const { compareData } = useReportData();
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  const objectList = compareData.map((item, index) => {
    return {
      id: index + 1,
      name: `File ${index + 1}`,
      data: item,
    };
  });

  // Handle Drop Down................
  const handleChangeDropDown = (event) => {
    const selectedValues = event.target.value;

    if (selectedValues.find((item) => item.id === "select-all")) {
      const selectedObjects = selectedValues.find(
        (item) => item.id === "select-all"
      );
      setIsToggled((prevState) => !prevState);
      if (isToggled) {
        setSelectedObjects([]);
        setChartData(getCompareChart([]));
        setTableData(getCompareTable([]));
      } else {
        setSelectedObjects(selectedObjects.data);
        setChartData(getCompareChart(selectedObjects.data));
        setTableData(getCompareTable(selectedObjects.data));
      }
    } else {
      const selectedObjects = objectList.filter((obj) =>
        selectedValues.includes(obj.id)
      );
      setSelectedObjects(selectedObjects);
      setChartData(getCompareChart(selectedObjects));
      setTableData(getCompareTable(selectedObjects));
    }
  };

  React.useEffect(() => {
    setChartData(getCompareChart(objectList));
    setTableData(getCompareTable(objectList));
  }, [compareData]);

  const classes = useStyles();

  return (
    <Fragment>
      {compareData.length > 0 ? (
        <div>
          <Box sx={{ width: 150, margin: "auto" }}>
            <FormControl fullWidth>
              <InputLabel>Select Files</InputLabel>
              <Select
                multiple
                value={selectedObjects.map((obj) => obj.id)}
                onChange={handleChangeDropDown}
                renderValue={(selected) =>
                  selectedObjects.map((obj) => obj.name).join(", ")
                }
              >
                <MenuItem
                  key="select-all"
                  value={{
                    id: "select-all",
                    name: "select-all",
                    data: objectList,
                  }}
                >
                  <CheckCircle
                    sx={{
                      visibility:
                        selectedObjects.length === objectList.length
                          ? "visible"
                          : "hidden",
                      marginRight: "8px",
                    }}
                  />
                  All
                </MenuItem>
                {objectList.map((obj) => (
                  <MenuItem key={obj.id} value={obj.id}>
                    <CheckCircle
                      sx={{
                        visibility: selectedObjects
                          .map((obj) => obj.id)
                          .includes(obj.id)
                          ? "visible"
                          : "hidden",
                        marginRight: "8px",
                      }}
                    />
                    {obj.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* summary compare section */}
          <SummaryCompare data={chartData} />

          {/* Grid summary  */}
          <CompareTable data={tableData} />
        </div>
      ) : (
        <Box className={classes.container}>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "95vh",
  },
});
