import React from 'react';
import GridData from '../components/GridData';
import useReportData from '../hooks/useReportData';

const GridContainer = () => {
    const{data}=useReportData()
  
    const griddata = {
        features: [],
      };
      
      data?.features?.forEach(feature => {
        const featureObj = {
          name: feature.name,
          duration: feature?.elements?.reduce((totalDuration, scenario) => totalDuration + scenario?.steps?.reduce((totalDuration, step) => totalDuration + step?.result?.duration, 0), 0),
          status: feature?.elements?.every(scenario => scenario?.steps.every(step => step?.result?.status === 'passed')) ? 'passed' : 'failed',
          scenarios: [],
        };
      
        feature?.elements?.forEach(scenario => {
          const scenarioObj = {
            name: scenario?.name,
            duration: scenario?.steps?.reduce((totalDuration, step) => totalDuration + step?.result?.duration, 0),
            status: scenario?.steps?.every(step => step?.result?.status === 'passed') ? 'passed' : 'failed',
            steps: [],
          };
      
          scenario?.steps?.forEach(step => {
            const stepObj = {
              name: step.name,
              duration: step?.result?.duration,
              status: step?.result?.status,
            };
            scenarioObj.steps.push(stepObj);
          });
      
          featureObj.scenarios.push(scenarioObj);
        });
      
        griddata.features.push(featureObj);
      });
      
      
  return (
        <GridData data={griddata} />   
  )
}

export default GridContainer