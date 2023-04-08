import React, { createContext } from 'react';
import useChartData from '../hooks/useChartData';

export const ReportContext = createContext();
const ReportProvider = ({ children }) => {
    const AllContext = useChartData();
    return (
        <ReportContext.Provider value={AllContext}>
            {children}
        </ReportContext.Provider>
    );
};

export default ReportProvider;