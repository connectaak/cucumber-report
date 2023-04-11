import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import * as React from 'react';
import { TabPanel } from '../components/TabPanel';
import TrendChart from '../components/TrendChart';
import useReportData from '../hooks/useReportData';
import { a11yProps } from '../utils/a11yProps';


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function TrendchartContainer() {
  const [value, setValue] = React.useState(0);
  const{data}=useReportData()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  let scenarios = [];
  let features = [];
  let steps = [];

  let featureNumber = 1;
  let scenarioNumber = 1;
  let stepNumber = 1;

  data?.features.forEach((feature) => {
    const featureName = `Feature ${featureNumber++}`;
    let featurePassedDuration = 0;
    let featureFailedDuration = 0;
    feature?.elements?.forEach((scenario) => {
      const scenarioName = `Scenario ${scenarioNumber++}`;
      let scenarioPassedDuration = 0;
      let scenarioFailedDuration = 0;
      let scenarioStatus = 'failed'; // default status is failed
      scenario?.steps?.forEach((step) => {
        if (step?.result?.status === 'passed') {
          scenarioPassedDuration += step?.result?.duration || 0; // add duration to passedDuration
          scenarioStatus = 'passed'; // if any step passed, scenario status will be passed
        } else if (step?.result?.status === 'failed' || step?.result?.status === 'undefined' || step?.result?.status === 'skipped') {
          scenarioFailedDuration += step?.result?.duration || 0; // add duration to failedDuration
        }
      });
      const scenarioDuration = scenarioPassedDuration + scenarioFailedDuration;
      const passedDuration = scenarioStatus === 'passed' ? scenarioDuration / 1000000 : 0;
      const failedDuration = scenarioStatus !== 'passed' ? scenarioDuration / 1000000 : 0;
      scenarios.push({
        name: scenarioName,
        duration: scenarioDuration / 1000000,
        featureName,
        status: scenarioStatus,
        passedDuration,
        failedDuration
      });
      featurePassedDuration += passedDuration;
      featureFailedDuration += failedDuration;
      steps.push(
        ...scenario?.steps?.map((step) => {
          const stepPassedDuration = step?.result?.status === 'passed' ? step?.result?.duration || 0 : 0;
          const stepFailedDuration = step?.result?.status !== 'passed' ? step?.result?.duration || 0 : 0;
          const stepDuration = stepPassedDuration + stepFailedDuration;
          const stepPassed = step?.result?.status === 'passed';
          return {
            name: `Step ${stepNumber++}`,
            duration: stepDuration / 1000000,
            scenarioName,
            featureName,
            status: stepPassed ? 'passed' : 'failed', // if step passed, status is passed, else failed
            passedDuration: stepPassed ? stepDuration / 1000000 : 0,
            failedDuration: stepPassed ? 0 : stepDuration / 1000000
          };
        })
      );
    });
    const featureDuration = (featurePassedDuration + featureFailedDuration) * 1000000;
    const featurePassed = featureFailedDuration === 0;
    features.push({
      name: featureName,
      duration: featureDuration / 1000000,
      status: featurePassed ? 'passed' : 'failed',
      passedDuration: featurePassed ? featureDuration / 1000000 : 0,
      failedDuration: featurePassed ? 0 : featureDuration / 1000000
    });
  });

 
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ marginTop:"20px",display:"flex",justifyContent:'center' }}>
        <Tabs textColor='red' TabIndicatorProps={{
    style: {
      backgroundColor: "#4caf50",
      TextColor:"red"
    }
  }} value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Feature" {...a11yProps(0)} />
          <Tab label="Scenarios" {...a11yProps(1)} />
          <Tab label="Steps/Tests" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <TrendChart data={features} title="Feature"/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <TrendChart data={scenarios} title="Scenarios"/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <TrendChart data={steps} title="Steps/Tests" steps/>
      </TabPanel>
    </Box>
  );
}