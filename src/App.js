import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Comparison from "./pages/Comparison";
import Home from "./pages/Home";
import ProjectThemeProvider from "./context/ColoProvider";
import ReportProvider from "./context/usePichart";
import { StylesProvider } from "@material-ui/core/styles";
import Json from "./pages/Json";

export default function App() {
  const classes = useStyles();

  // make unique ............
  const generateClassName = () => {
    let counter = 0;
    return (rule, styleSheet) => {
      counter += 1;
      return `${styleSheet.options.classNamePrefix}-${rule.key}-${counter}`;
    };
  };

  return (
    <StylesProvider generateClassName={generateClassName()} injectFirst>
      <ProjectThemeProvider>
        <ReportProvider>
          <HashRouter>
            <Navigation />
            <Box
              className={classes.container}
              sx={{ bgcolor: "background.default", color: "text.primary" }}
            >
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/json" element={<Json />} />
                <Route path="/comparison" element={<Comparison />} />
              </Routes>
            </Box>
          </HashRouter>
        </ReportProvider>
      </ProjectThemeProvider>
    </StylesProvider>
  );
}

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "100%",
    bgcolor: "background.default",
    color: "text.primary",
  },
});
