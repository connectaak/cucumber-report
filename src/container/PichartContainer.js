import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PichartCart from '../components/PichartCart';
import useReportData from '../hooks/useReportData';
// import { cucumberReportCustomData } from '../utils/cucumberReportCustomData';
import { cucumberCustomObject } from '../utils/getCucumberCustomObj';


const PichartContainer = () => {
    const{data, setCounterData}=useReportData()
    const [chartData, setChartData] = useState([])
    // const {featureData,scenarioData,stepData}=cucumberReportCustomData(data);
useEffect(() => {
    const {chartData,counterData}= cucumberCustomObject(data)
    setCounterData(counterData)
    setChartData(chartData)
}, [data])
    return (
        <Box style={{display:"flex",flexWrap:"wrap ",gap:"10px",justifyContent:"center "}} >
         {
            chartData.map((item,index)=>(
                <PichartCart key={index} data={item.data} title={item.title}/>
            ))
         }
        </Box>
    );
};

export default PichartContainer;