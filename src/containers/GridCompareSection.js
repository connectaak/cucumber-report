import React, { useEffect, useState } from "react";
import GridSCompare from "./GridCompare";
import { Box, Button, Paper, Typography } from "@mui/material";
import { validateCucumberData } from "../utils/validateCucumberData";
import swal from "sweetalert";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { makeStyles } from "@mui/styles";
import useReportData from "../hooks/useReportData";
import { getReportCompareGrid } from "../utils/getReportCompareGrid";
import { getCurrentDateAndTime } from "../utils/getCurrentDateAndTime";

const GridCompareSection = () => {
  const { data, customData } = useReportData();
  const [previousData, setPreviousData] = useState([]);
  const [gridCompareData, setGridCompareData] = useState([]);

  // const handleFileUpload = (event) => {
  //   event.preventDefault();
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsText(file);
  //   reader.onload = async (readerEvent) => {
  //     try {
  //       // Try to run this code
  //       const content = readerEvent.target.result;
  //       if (content) {
  //         const cucumberJsonObject = JSON.parse(content);
  //         setPreviousData([...previousData, cucumberJsonObject]);
  //       }
  //     } catch (err) {
  //       // if any error, Code throws the error

  //       swal({
  //         title: "Oops",
  //         text: "Please upload a cucumber json file",
  //         icon: "warning",
  //         button: "ok",
  //       });
  //     }

  //     event.target.value = null;
  //   };
  // };

  const handleFileUpload = (event) => {
    event.preventDefault();
    // Access all selected files
    const files = event.target.files;

    // Iterate over all files
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = async (readerEvent) => {
        try {
          // Try to run this code
          const content = readerEvent.target.result;
          if (content) {
            const cucumberJsonObject = JSON.parse(content);
            // Assuming setPreviousData is a state updater function, you might need to adjust this
            // to correctly handle multiple updates in a row.
            setPreviousData((prevData) => [...prevData, cucumberJsonObject]);
          }
        } catch (err) {
          // if any error occurs, show the error
          swal({
            title: "Oops",
            text: "Please upload a valid cucumber JSON file",
            icon: "warning",
            button: "ok",
          });
        }
      };

      // This will clear the input after the files have been processed
      // so the same files can be uploaded again if needed
      event.target.value = null;
    });
  };

  useEffect(() => {
    const customDataJson = {
      datetime: getCurrentDateAndTime(),
      data: customData,
    };
    setPreviousData([customDataJson]);
  }, [customData]);
  // Example usage:
  useEffect(() => {
    if (previousData.length > 1) {
      const report = getReportCompareGrid(previousData);
      setGridCompareData(report);
    }
  }, [customData, previousData]);
  const classes = useStyles();
  return (
    <Box sx={{ margin: "100px 0" }}>
      <div>
        <input
          type="file"
          id="file_1"
          name="file"
          accept=".json"
          multiple
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
        {/* <Paper sx={{ padding: "100px 0" }}>
          <Typography variant="h5" align="center">
            Please upload previous Json for Grid Comparison!
          </Typography>
        </Paper> */}
      </div>

      {previousData && data && (
        <GridSCompare gridCompareData={gridCompareData} />
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
