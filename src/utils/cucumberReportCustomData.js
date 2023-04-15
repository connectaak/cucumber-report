
export const cucumberReportCustomData = (report)=>{

// Extract the data for the feature chart
const featureChartData = report.map(feature => {
    const status = feature.elements.some(scenario => scenario.steps.some(step => step.result.status === 'failed'))
      ? 'failed'
      : 'passed';
    return { name: feature.name, value: 1, status };
  });
  const featureDataGroupedByStatus = featureChartData.reduce((result, data) => {
    if (!result[data.status]) {
      result[data.status] = { name: data.status, value: 0 };
    }
    result[data.status].value += data.value;
    return result;
  }, {});
  const featureData = Object.values(featureDataGroupedByStatus);

  // Extract the data for the scenario chart
  const scenarioChartData = report.flatMap(feature => {
    return feature.elements.map(scenario => {
      const status = scenario.steps.some(step => step.result.status === 'failed')
        ? 'failed'
        : 'passed';
      return { name: scenario.name, value: 1, status };
    });
  });

  
  const scenarioDataGroupedByStatus = scenarioChartData.reduce((result, data) => {
    if (!result[data.status]) {
      result[data.status] = { name: data.status, value: 0 };
    }
    result[data.status].value += data.value;
    return result;
  }, {});
  const scenarioData = Object.values(scenarioDataGroupedByStatus);

  // Extract the data for the step chart
  const stepChartData = report.flatMap(feature => {
    return feature.elements.flatMap(scenario => {
      return scenario.steps.map(step => {
        const status = step.result.status;
        return { name: step.name, value: 1, status };
      });
    });
  });
  const stepDataGroupedByStatus = stepChartData.reduce((result, data) => {
    if (!result[data.status]) {
      result[data.status] = { name: data.status, value: 0 };
    }
    result[data.status].value += data.value;
    return result;
  }, {});
  const stepData = Object.values(stepDataGroupedByStatus);
  return {featureData,scenarioData,stepData}
}