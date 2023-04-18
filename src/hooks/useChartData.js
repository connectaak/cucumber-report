import React from 'react';

const useChartData = () => {
    const [data, setData] = React.useState([]);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [counterData, setCounterData] = React.useState([]);
    const [totalReport,setTotalReport]=React.useState(0);
    return { 
        data,
        setData,
        setIsSuccess,
        isSuccess,
        counterData,
        setCounterData,
        totalReport,
        setTotalReport
    };
};

export default useChartData;