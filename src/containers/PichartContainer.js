import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PichartCart from '../components/PichartCart';
import useReportData from '../hooks/useReportData';
import { cucumberCustomObject } from '../utils/getCucumberCustomObj';


const PichartContainer = () => {
    const{data, setCounterData,totalReport}=useReportData()
    const [chartData, setChartData] = useState([])
console.log(chartData,"chartData")
useEffect(() => {
    const {chartData,featuresData,counterData}= cucumberCustomObject(data)
    setCounterData(counterData)
    setChartData(chartData)
   console.log(featuresData,"featuresData")
}, [data, setCounterData])
    return (
        <Box id="pichart" style={{display:"flex",flexWrap:"wrap ",gap:"10px",justifyContent:"center ",marginTop:"25px"}} >
         {
            chartData.map((item,index)=>(
                <PichartCart key={index} data={item.data} title={item.title}/>
            ))
         }
        </Box>
    );
};

export default PichartContainer;