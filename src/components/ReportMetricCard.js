import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { NavLink } from "react-router-dom";

const ReportMetricCard = ({ title, value1, value2, logo }) => {
  const classes = useStyles();

  return (
    <Box className={classes.parentContainer}>
      <Box className={classes.container}>
        <Box>
          <NavLink activeClassName="is-active" className={classes.logo} to="/">
            <img className={classes.logo} src={logo} alt="" />
          </NavLink>
        </Box>
        <Typography className={classes.btn}>{title}</Typography>
        <Typography className={classes.text}>{value1}</Typography>
        {value2 && <Typography className={classes.text}>{value2}</Typography>}
      </Box>
      <Box className={classes.behindContainer} />
    </Box>
  );
};

export default ReportMetricCard;

const useStyles = makeStyles({
  parentContainer: {
    position: "relative",
    width: "200px !important",
    margin: "10px !important",
  },
  container: {
    width: "100% !important",
    height: "180px !important",
    background: "#0476B5 !important",
    display: "flex !important",
    flexDirection: "column !important",
    alignItems: "center !important",
    justifyContent: "center !important",
    position: "relative !important",
    zIndex: 2,
    borderRadius: "2px !important",
    border: "1px solid gray !important",
  },
  behindContainer: {
    width: "100% !important",
    height: "180px !important",
    background: "#FCD73C !important",
    position: "absolute",
    top: "10px",
    left: "10px",
    zIndex: 1,
    borderRadius: "2px !important",
    // border: '1px solid gray !important',
  },
  text: {
    fontSize: "20px !important",
    fontWeight: "600 !important",
    color: "white !important",
  },
  btn: {
    textAlign: "center !important",
    fontSize: "18px !important",
    fontWeight: "500 !important",
    margin: "5px 0 !important",
    color: "white !important",
  },
  logo: {
    width: "50px",
  },
});
