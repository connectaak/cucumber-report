import React from 'react';

const useChartData = () => {
    const [data, setData] = React.useState({});
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [counterData, setCounterData] = React.useState([]);
    return { data, setData,setIsSuccess,isSuccess,counterData, setCounterData };
};

export default useChartData;