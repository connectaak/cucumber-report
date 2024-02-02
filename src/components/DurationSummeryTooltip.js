import { makeStyles } from "@material-ui/styles";
import { Box } from "@mui/material";
import { getSecondsToDuration } from "../utils/nanosecondConverter";
// import { NanosecondsConverter } from "../utils/nanosecondConverter";

const DurationSummeryTooltip = ({ active, payload, label, summaryCompare }) => {
  const classes = useStyles();

  if (active && payload && payload.length) {
    return (
      <Box>
        {summaryCompare ? (
          <Box className={classes.container}>
            <p className={classes.lebel}>{label}</p>
            <p className={classes.lebel}>Value : {payload[0].value}</p>
          </Box>
        ) : (
          <Box className={classes.container}>
            {payload[0].payload.featureName && (
              <p className={classes.lebel}>{payload[0].payload.featureName}</p>
            )}
            {payload[0].payload.scenarioName && (
              <p className={classes.lebel}>{payload[0].payload.scenarioName}</p>
            )}
            <p className={classes.lebel}>{label}</p>
            {payload[0].payload.tooltipVlue ? (
              <p className={classes.lebel}>
                Duration :{" "}
                {
                  getSecondsToDuration(payload[0].payload.tooltipVlue)
                    .totalDuration
                }
              </p>
            ) : (
              <p className={classes.lebel}>
                Duration :{" "}
                {getSecondsToDuration(payload[0].value).totalDuration}
              </p>
            )}
          </Box>
        )}
      </Box>
    );
  }
};
export default DurationSummeryTooltip;

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
