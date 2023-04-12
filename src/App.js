import { Box } from "@mui/material";
import { makeStyles } from '@mui/styles';
import React from 'react';
import './App.css';
import Navigation from "./components/Navigation";
import Home from './pages/Home';

 export function App() {
  const classes=useStyles()
  return (
    <Box className={classes.container} sx={{ bgcolor: "background.default",
    color: "text.primary",}} >
     <Navigation/>
     <Home/>
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