import DownloadIcon from "@mui/icons-material/Download";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { Fragment, useRef, useState } from "react";
import GridSummery from "../components/GridSummery";
import ReportMatrics from "../containers/ReportMatrics";
import ChartSummery from "../containers/ChartSummery";
import DurationSummery from "../containers/DurationSummery";
import useReportData from "../hooks/useReportData";
const Home = () => {
  const { data } = useReportData();
  const classes = useStyles();
  const ref = useRef();

  const features = [
    <ReportMatrics />,
    <ChartSummery />,
    <DurationSummery />,
    <GridSummery />,
  ];
  const [featuresItems, setfeaturesItems] = useState(features);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  //const handle drag sorting
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
  const handlePdfExport = () => {
    html2canvas(ref.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", [
        ref.current.offsetWidth,
        ref.current.offsetHeight,
      ]);
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        ref.current.offsetWidth,
        ref.current.offsetHeight
      );
      pdf.save("website-screen.pdf");
    });
  };

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
    bottom: "80px",
    left: "5px",
    width: "100%",
    margin: "10px 0",
    zIndex: "999",
  },
  btnBG: {
    background: "#0476B5 !important",
  },
});
