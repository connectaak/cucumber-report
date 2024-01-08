import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const bgColors = {
  passed: "#89DE91",
  failed: "#F29387",
  skipped: "#88AAFF",
  pending: "#D7D7A3",
  undefined: "#E9BA77",
  total: "#D5D2D2",
};
const GirdSubHeader = () => {
  const classes = useStyles();

  return (
    <>
      <Grid className={classes.borderLine} item xs={4}>
        <Typography className={classes.text}> Features </Typography>
      </Grid>

      <Grid container item xs={4}>
        <Grid
          className={classes.borderLine}
          style={{ background: bgColors.passed }}
          item
          xs={2}
        >
          {" "}
          <Typography className={classes.text}> Passed </Typography>{" "}
        </Grid>

        <Grid
          className={classes.borderLine}
          item
          xs={2}
          style={{ background: bgColors.failed }}
        >
          {" "}
          <Typography className={classes.text}> Failed </Typography>{" "}
        </Grid>

        <Grid
          className={classes.borderLine}
          item
          xs={2}
          style={{ background: bgColors.skipped }}
        >
          {" "}
          <Typography className={classes.text}> Skipped </Typography>{" "}
        </Grid>

        <Grid
          className={classes.borderLine}
          item
          xs={2}
          style={{ background: bgColors.pending }}
        >
          {" "}
          <Typography className={classes.text}> Pending </Typography>{" "}
        </Grid>

        <Grid
          className={classes.borderLine}
          item
          xs={2}
          style={{ background: bgColors.undefined }}
        >
          {" "}
          <Typography className={classes.text}> Undefined </Typography>{" "}
        </Grid>

        <Grid
          className={classes.borderLine}
          item
          xs={2}
          style={{ background: bgColors.total }}
        >
          {" "}
          <Typography className={classes.text}> Total </Typography>{" "}
        </Grid>
      </Grid>

      <Grid container item xs={2}>
        <Grid className={classes.borderLine} item xs={4}>
          {" "}
          <Typography
            className={classes.text}
            style={{ background: bgColors.passed }}
          >
            {" "}
            Passed{" "}
          </Typography>{" "}
        </Grid>
        <Grid className={classes.borderLine} item xs={4}>
          {" "}
          <Typography
            className={classes.text}
            style={{ background: bgColors.failed }}
          >
            {" "}
            Failed{" "}
          </Typography>{" "}
        </Grid>
        <Grid className={classes.borderLine} item xs={4}>
          {" "}
          <Typography
            className={classes.text}
            style={{ background: bgColors.total }}
          >
            {" "}
            Total{" "}
          </Typography>{" "}
        </Grid>
      </Grid>

      <Grid container item xs={2}>
        <Grid className={classes.borderLine} item xs={7}>
          {" "}
          <Typography className={classes.text}> Duration </Typography>{" "}
        </Grid>
        <Grid className={classes.borderLine} item xs={5}>
          {" "}
          <Typography className={classes.text}> Status </Typography>{" "}
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles({
  borderLine: {
    border: "0.5px solid black",
    textAlign: "center",
  },
  text: {
    fontWeight: "bold !important",
    fontSize: "14px !important",
  },
});

export default GirdSubHeader;
