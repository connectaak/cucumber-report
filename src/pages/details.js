import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@mui/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import PichartCart from "../components/PichartCart";
import useReportData from "../hooks/useReportData";
import { cucumberCustomObject } from "../utils/getCucumberCustomObj";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  NanosecondsConverter,
  getSecondsToDuration,
} from "../utils/nanosecondConverter";

const Details = () => {
  const { id } = useParams();

  const classes = useStyles();
  const { data, setCounterData } = useReportData();
  const [chartData, setChartData] = useState([]);
  const [scenarioDetails, setScenarioDetails] = useState();
  const COLORS = {
    passed: "#00C49F",
    failed: "#FF0000",
    skipped: "#0088FE",
    pending: "#FFBB28",
    undefined: "#B068F9",
  };
  // Loading chart data...........
  useEffect(() => {
    const newData = data.filter((item, index) => index == id);

    const scenarioData = newData[0]?.elements?.map((scenario) => {
      const stepsData = scenario.steps?.map((step) => ({
        stepName: step.name,
        stepKeyword: step.keyword,
        resultDuration: step.result.duration,
        resultStatus: step.result.status,
      }));

      return {
        scenarioName: scenario.name,
        scenarioKeyword: scenario.keyword,
        steps: stepsData,
      };
    });

    setScenarioDetails(scenarioData);
    const { chartData, counterData } = cucumberCustomObject(newData);
    setCounterData(counterData);
    setChartData(chartData);
  }, [data, id, setCounterData]);

  return (
    <div className={classes.container}>
      <Typography align="center" marginBottom="20px" variant="h3">
        SCENARIO DETAILS
      </Typography>
      {/* <Typography variant="body1">
        <span>Description:</span> The scenarios have been scripted twice So the
        report should hold ambiguous steps
      </Typography>
      <Typography variant="body1">
        <span>File name:</span> ambiguous.feature
      </Typography>
      <Typography variant="body1">
        <span> Relative path:</span> features/ambiguous.feature
      </Typography> */}
      {/* <Grid container justifyItems="space-between"> */}
      <Box
        id="pichart"
        style={{
          display: "flex",
          flexWrap: "wrap ",
          gap: "10px",
          justifyContent: "center ",
          marginTop: "25px",
        }}
      >
        {chartData.slice(1, 2).map((item, index) => (
          <PichartCart
            key={index}
            data={item.data}
            title={item.title}
            details
          />
        ))}
      </Box>

      <Box className={classes.cardDetails}>
        <div>
          {/* <hr /> */}
          {scenarioDetails?.map((scenario, index) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h4">
                  <span>Scenario</span> : {scenario.scenarioName}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {scenario.steps?.map((step, index) => (
                  <Box display="flex" justifyContent="space-between">
                    <Box key={step} display="flex" gap="10px">
                      <CheckCircleIcon
                        style={{ color: COLORS[step.resultStatus] }}
                      />
                      <Typography variant="body1">
                        <span style={{ color: COLORS[step.resultStatus] }}>
                          {step.stepKeyword}
                        </span>
                        {step.stepName}
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      {NanosecondsConverter(step.resultDuration).totalDuration}
                    </Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default Details;

const useStyles = makeStyles((theme) => ({
  container: {
    // textAlign: "center !important",
    marginTop: "50px",
    "& p": {
      marginBottom: "10px",
    },
    "& span": {
      fontWeight: 600,
    },
  },
  cardDetails: {
    width: "80% !important",
    // height: "420px !important",
    padding: "30px !important",
    borderRadius: 10,
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.3) !important",
    position: "relative !important",
    margin: "100px auto 50px auto",
  },
}));
