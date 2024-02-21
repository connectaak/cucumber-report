import React, { useEffect } from "react";

const useChartData = () => {
  const [data, setData] = React.useState([]);
  const [ReportData, setReportData] = React.useState([]);
  const [compareData, setCompareData] = React.useState([]);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [counterData, setCounterData] = React.useState([]);
  const [totalReport, setTotalReport] = React.useState(0);
  const [customData, setCustomData] = React.useState([]);

  const getCustomData = (data) => {
    if (data.length > 0) {
      let output = [];

      // nested data
      // data?.forEach((feature) => {
      //   let featureObj = {
      //     featureId: feature.id,
      //     featureName: feature.name,
      //     featureDescription: feature.elements[0].description,
      //     featureUri: feature.uri,
      //     featureTags: feature.tags,
      //     scenario: [],
      //   };
      //   feature.elements.forEach((scenario) => {
      //     let scenarioObj = {
      //       scenarioId: scenario.id,
      //       scenarioName: scenario.name,
      //       scenarioTags: scenario.tags,
      //       steps: [],
      //     };
      //     scenario.steps.forEach((step) => {
      //       let stepObj = {
      //         stepName: step.name,
      //         stepResultStatus: step.result.status,
      //         stepResultDuration: step.result.duration,
      //         stepTags: step.tags,
      //       };
      //       scenarioObj.steps.push(stepObj);
      //     });
      //     featureObj.scenario.push(scenarioObj);
      //   });
      //   output.push(featureObj);
      // });

      // flat Data
      ReportData.forEach((report, index) => {
        report.data.forEach((feature) => {
          const featureOutput = {
            featureId: feature.id,
            featureName: feature.name,
            featureDescription: feature.elements[0].description,
            featureUri: feature.uri,
            featureTags: feature.tags,
            details: [],
          };
          feature.elements.forEach((scenario) => {
            scenario.steps.forEach((step) => {
              featureOutput.details.push({
                scenarioId: scenario.id,
                scenarioName: scenario.name,
                scenarioTags: scenario.tags,
                stepName: step.name,
                stepResultStatus: step.result.status,
                stepResultDuration: step.result.duration,
                stepTags: step.tags,
                reportId: index + 1,
                reportName: report.reportName,
              });
            });
          });
          output.push(featureOutput);
        });
      });

      setCustomData(output);
    }
  };
  useEffect(() => {
    getCustomData(data);
  }, [data]);

  return {
    data,
    setData,
    ReportData,
    setReportData,
    setIsSuccess,
    isSuccess,
    counterData,
    setCounterData,
    totalReport,
    setTotalReport,
    setCompareData,
    compareData,
    customData,
  };
};

export default useChartData;
