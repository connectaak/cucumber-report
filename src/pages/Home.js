import DownloadIcon from "@mui/icons-material/Download";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
import React, { Fragment, useRef, useState } from "react";
import GridSummery from "../containers/GridSummery";
import ReportMetrics from "../containers/ReportMetrics";
import ChartSummery from "../containers/ChartSummery";
import DurationSummery from "../containers/DurationSummery";
import useReportData from "../hooks/useReportData";
import GridCompareSection from "../containers/GridCompareSection";
import { getCurrentDateAndTime } from "../utils/getCurrentDateAndTime";

const features = [
  <ReportMetrics />,
  <ChartSummery />,
  <DurationSummery />,
  <GridSummery />,
  <GridCompareSection />,
];

const Home = () => {
  const { data, customData } = useReportData();
  const classes = useStyles();
  const ref = useRef();
  const [featuresItems, setfeaturesItems] = useState(features);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const currentDateTime = getCurrentDateAndTime();

  const exportJSON = () => {
    const jsonString = JSON.stringify(
      { datetime: currentDateTime, data: customData },
      null,
      2
    ); // Pretty print with indentation of 2 spaces

    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${customData[0].reportName}_grid_json_${currentDateTime}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  console.log(customData, "customData");
  //const handle drag sorting.................
  const handleSort = (e) => {
    //duplicate items
    let _featuresItems = [...featuresItems];
    //remove and save the dragged item content
    const draggedItemContent = _featuresItems.splice(dragItem.current, 1)[0];

    //switch the position
    _featuresItems.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setfeaturesItems(_featuresItems);

    // auto-scroll when dragging near the top or bottom of the screen
    const scrollZoneHeight = 100; // number of pixels near the top/bottom to start scrolling
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const bottomScrollLimit =
      document.body.clientHeight - windowHeight - scrollZoneHeight;

    if (e.clientY < scrollZoneHeight && scrollTop > 0) {
      window.scrollTo(0, scrollTop - 10);
    } else if (
      e.clientY > windowHeight - scrollZoneHeight &&
      scrollTop < bottomScrollLimit
    ) {
      window.scrollTo(0, scrollTop + 10);
    }
  };

  // Export  PDF ..................

  const handlePdfExport = () => {
    const element = document.documentElement;

    // Zoom out the content using CSS transformation
    element.style.transform = "scale(0.8)"; // Adjust the scale factor as needed

    const options = {
      margin: 0.5, // Optional - set the margin
      filename: "website-screen.pdf",
      image: { type: "png", quality: 1 }, // Set the image quality to 1 (maximum quality)
      html2canvas: { scale: 2 }, // Optional - adjust the html2canvas scale
      jsPDF: {
        unit: "pt",
        format: "letter",
        orientation: "landscape",
        width: "wrap",
      }, // Set the PDF width to 'wrap'
    };

    html2pdf().set(options).from(element).save();

    // Reset the transformation after generating the PDF
    element.style.transform = "none";
  };

  // const handlePdfExport = () => {
  //   html2canvas(ref.current, { scale: 2 }).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("l", "mm", [
  //       ref.current.offsetWidth,
  //       ref.current.offsetHeight,
  //     ]);
  //     pdf.addImage(
  //       imgData,
  //       "PNG",
  //       0,
  //       0,
  //       ref.current.offsetWidth,
  //       ref.current.offsetHeight
  //     );
  //     pdf.save("website-screen.pdf");
  //   });
  // };

  return (
    <Fragment>
      {data.length > 0 ? (
        <div>
          <div className={classes.btnContainer}>
            <Button
              className={classes.btnBG}
              disableRipple
              onClick={handlePdfExport}
              variant="contained"
              component="span"
              endIcon={<DownloadIcon rounded />}
            >
              PDF
            </Button>
            <button onClick={exportJSON}>Export JSON</button>
          </div>
          <div ref={ref}>
            {featuresItems.map((EventComp, index) => {
              return (
                <div
                  key={EventComp.key}
                  className="mt-5"
                  draggable
                  onDragStart={(e) => {
                    dragItem.current = index;
                  }}
                  onDragEnter={(e) => (dragOverItem.current = index)}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {EventComp}
                </div>
              );
            })}
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "95vh",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "end",
    position: "fixed",
    // top: '75px',
    bottom: "20px",
    left: "5px",
    width: "100%",
    margin: "10px 0",
    zIndex: "999",
  },
  btnBG: {
    background: "#0476B5 !important",
  },
});
