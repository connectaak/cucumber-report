import React from 'react';
import GridData from '../components/GridData';
import useReportData from '../hooks/useReportData';
import { getGridData } from '../utils/getGridData';

const GridContainer = () => {
    const{data}=useReportData()
  
    const gridData=getGridData(data)
  return (
        <GridData data={gridData} />   
  )
}

export default GridContainer