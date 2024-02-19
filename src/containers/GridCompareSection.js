import React, { useEffect, useState } from "react";
import GridSCompare from "./GridCompare";
import { Box, Button, Paper, Typography } from "@mui/material";
import { validateCucumberData } from "../utils/validateCucumberData";
import swal from "sweetalert";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { makeStyles } from "@mui/styles";
import useReportData from "../hooks/useReportData";
import { getReportCompareGrid } from "../utils/getReportCompareGrid";

const GridCompareSection = () => {
  const [previousData, setPreviousData] = useState();
  const { data } = useReportData();
  const [gridCompareData, setGridCompareData] = useState([]);
  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async (readerEvent) => {
      try {
        // Try to run this code
        const content = readerEvent.target.result;
        if (content) {
          validateCucumberData(JSON.parse(content));
          const cucumberJsonObject = JSON.parse(content);
          //   const cucuberReportObject = {
          //     data: cucumberJsonObject,
          //   };
          //   cucuberReportObject.reportName = file?.name?.split(".")[0];

          setPreviousData(cucumberJsonObject);
        }
      } catch (err) {
        // if any error, Code throws the error

        swal({
          title: "Oops",
          text: "Please upload a cucumber json file",
          icon: "warning",
          button: "ok",
        });
      }

      event.target.value = null;
    };
  };
  // Example usage:
  useEffect(() => {
    if (data && previousData) {
      const report = getReportCompareGrid(data, previousData);

      setGridCompareData(report);
    }
  }, [data, previousData]);
  const classes = useStyles();
  return (
    <Box sx={{ margin: "100px 0" }}>
      {previousData && data ? (
        <GridSCompare gridCompareData={gridCompareData} />
      ) : (
        <div>
          <input
            type="file"
            id="file_1"
            name="file"
            accept=".json"
            style={{ display: "none" }}
            onChange={(event) => {
              handleFileUpload(event);
            }}
          />
          <label className={classes.btnContainer} htmlFor="file_1">
            <Button
              className={classes.btnBG}
              variant="contained"
              component="span"
              endIcon={<UploadFileRoundedIcon rounded />}
            >
              <Typography sx={{ display: { xs: "none", md: "flex" } }}>
                Upload Previous JSON
              </Typography>
            </Button>
          </label>
          <Paper sx={{ padding: "100px 0" }}>
            <Typography variant="h5" align="center">
              Please upload previous Json for Grid Comparison!
            </Typography>
          </Paper>
        </div>
      )}
    </Box>
  );
};

export default GridCompareSection;
const useStyles = makeStyles({
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "10px 0",
  },
  btnBG: {
    background: "#0476B5 !important",
  },
});
