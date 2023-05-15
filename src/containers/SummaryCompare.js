import { CheckCircle } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import SummaryCompareItem from '../components/SummaryCompare';
import { TabPanel } from '../components/TabPanel';
import useReportData from '../hooks/useReportData';
import { a11yProps } from '../utils/a11yProps';
import { getCompareChart } from '../utils/getCompareChart';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function SummaryCompare() {
  const [value, setValue] = useState(0);
  const{compareData}=useReportData()
  const objectList=compareData.map((item,index)=>{
    return {
      id:index+1,
      name:`File ${index+1}`,
      data:item
    }
  })

  const [selectedObjects, setSelectedObjects] = useState([]);
 
  const [chartData, setChartData] = useState([])


const handleChangeDropDown = (event) => {
  const selectedValues = event.target.value;
  const selectedObjects = objectList.filter((obj) => selectedValues.includes(obj.id));
  
  setSelectedObjects(selectedObjects);
  setChartData(getCompareChart(selectedObjects))
};
const handleChange = (event, newValue) => {
    setValue(newValue);
};



React.useEffect(() => {
  const chartData= getCompareChart(objectList)
  setChartData(chartData)  
}, [compareData ])
  return (
    <Box id="trendchart" sx={{ width: '100%' }}>
      <Box sx={{ margin:"20px 20px",display:"flex",justifyContent:'space-between' }}>
        <Box></Box>
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
        <Box sx={{ width: 130}}>
            <FormControl fullWidth>
        <InputLabel>Select Files</InputLabel>
        <Select
          multiple
          value={selectedObjects.map((obj) => obj.id)}
          onChange={handleChangeDropDown}
          renderValue={(selected) =>
        
            selectedObjects.map((obj) => obj.name).join(', ')
          }
        >
          {objectList.map((obj) => (
            <MenuItem key={obj.id} value={obj.id}>
               <CheckCircle
           
                sx={{
                  visibility: selectedObjects.map((obj) => obj.id).includes(obj.id) ? 'visible' : 'hidden',
                  marginRight: '8px',
                  
                  color:"#0476B5"
                }}
              />
              {obj.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
          </Box>
      </Box>
      {
            chartData?.map((item,index)=>(
                <TabPanel value={value} index={index}>
                <SummaryCompareItem  key={index} data={item.data} title={item.title}/>
                </TabPanel>
                ))
            }
    </Box>
  );
}