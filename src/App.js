import { Box } from "@mui/material";
import { makeStyles } from '@mui/styles';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from "./components/Navigation";
import Comparison from "./pages/Comparison";
import Home from './pages/Home';
import Json from "./pages/Json";
 export function App() {
  const classes=useStyles()
  return (
    <Box className={classes.container} sx={{ bgcolor: "background.default",
    color: "text.primary",}} >
    
      <HashRouter>
      <Navigation/>
      <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route path='/json' element={<Json/>} />
      <Route path='/comparison' element={<Comparison/>} />
      </Routes>
      </HashRouter>
    </Box>

  );
}

 const useStyles= makeStyles({
  container:{
    width: "100%",
    height: "100%",
    bgcolor: "background.default",
    color: "text.primary",
  }
})