import React, { Fragment } from 'react';
import CounterContainer from '../components/CounterContainer';
import PichartContainer from '../container/PichartContainer';
import TrendchartContainer from '../container/TrendchartContainer';
import useReportData from '../hooks/useReportData';
import GridContainer from '../container/GridContainer';

const Home = () => {
    const {isSuccess}=useReportData()
  
    return (
 <Fragment>
   {isSuccess? <>
            <CounterContainer/>
            <PichartContainer/>
           <TrendchartContainer/>
           <GridContainer/>
    </>:
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"90vh"}}>       
    <h2>Please upload a cucumber json to see the report.</h2>
    </div>
    }
          
        </Fragment> 
       
    );
};

export default Home;