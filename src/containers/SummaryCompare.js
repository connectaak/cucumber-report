import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import SummaryCompareItem from '../components/SummaryCompare';
import { TabPanel } from '../components/TabPanel';
import { a11yProps } from '../utils/a11yProps';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function SummaryCompare({data}) {
  const [value, setValue] = useState(0);
 
const handleChange = (event, newValue) => {
    setValue(newValue);
};

  return (
    <Box id="trendchart" sx={{ width: '100%' }}>
      <Box sx={{ margin:"20px 20px",display:"flex",justifyContent:'center' }}>
   
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
            data?.map((item,index)=>(
                <TabPanel value={value} index={index}>
                <SummaryCompareItem  key={index} data={item.data} title={item.title}/>
                </TabPanel>
                ))
            }
    </Box>
  );
}