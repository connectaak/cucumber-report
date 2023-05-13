import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';

import DurationCompare from '../components/DurationCompare';
import { TabPanel } from '../components/TabPanel';
import useReportData from '../hooks/useReportData';
import { a11yProps } from '../utils/a11yProps';
import { getCompareChart } from '../utils/getCompareChart';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function DurationsCompare() {
  const [value, setValue] = useState(0);
  const{compareData}=useReportData()
  // const [chartData, setChartData] = useState([])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

//  const {featuresData}= getComparisonData(compareData) 
 const chartData= getCompareChart(compareData)

// React.useEffect(() => {
    

    // setChartData(chartData)
  //  console.log(featuresData,"featuresData")
// }, [compareData])
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
      {
            chartData.map((item,index)=>(
                <TabPanel value={value} index={index}>
                <DurationCompare  key={index} data={item.data} title={item.title}/>
                </TabPanel>
                ))
            }
    </Box>
  );
}