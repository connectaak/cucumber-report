import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import { TabPanel } from '../components/TabPanel';
import TrendChart from '../components/TrendChart';
import useReportData from '../hooks/useReportData';
import { a11yProps } from '../utils/a11yProps';
import { getTrendChartData } from '../utils/getTrendChartData';


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function TrendchartContainer() {
  const [value, setValue] = useState(0);
  const{data }=useReportData()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
const {scenarios, features,steps}=getTrendChartData(data);
 
  return (
    <Box id="trendchart" sx={{ width: '100%' }}>
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