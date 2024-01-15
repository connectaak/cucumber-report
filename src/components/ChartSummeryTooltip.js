import { makeStyles } from "@material-ui/styles";
import { Box } from "@mui/material";
// import { getSecondsToDuration } from "../utils/nanosecondConverter";
// import { NanosecondsConverter } from "../utils/nanosecondConverter";

const ChartSummeryTooltip = ({ active, payload, title }) => {
  const classes = useStyles();

  if (active && payload && payload.length) {
    return (
      <Box>
        <Box className={classes.container}>
          <p className={classes.lebel}>{payload[0].name}</p>
          <p className={classes.lebel}>
            {title} : {payload[0].value}
          </p>
        </Box>
      </Box>
    );
  }
};
export default ChartSummeryTooltip;

const useStyles = makeStyles({
  container: {
    padding: "10px",
    backgroundColor: "white",
  },
  lebel: {
    color: "black",
    fontSize: "16px",
    lineHeight: "16px",
  },
});
