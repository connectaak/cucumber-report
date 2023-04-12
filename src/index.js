import { StylesProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from "./App";
import ProjectThemeProvider from './context/ColoProvider';
import ReportProvider from "./context/usePichart";
import './index.css';
import reportWebVitals from './reportWebVitals';
const generateClassName = () => {
  let counter = 0;
  return (rule, styleSheet) => {
    counter += 1;
    return `${styleSheet.options.classNamePrefix}-${rule.key}-${counter}`;
  };
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <StylesProvider generateClassName={generateClassName()}  injectFirst>
     <ReportProvider>
     <ProjectThemeProvider>
     <App/>
     </ProjectThemeProvider>
     </ReportProvider>
     </StylesProvider>
  </React.StrictMode>
);


reportWebVitals();
