import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Box, Link, Typography } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Scrollspy from 'react-scrollspy';
import logo from '../assets/images/logo.png';
import { ColorModeContext } from '../context/ColoProvider';
import useReportData from "../hooks/useReportData";
import FileUpload from './FileUpload';

const Navigation = () => {
    const theme = useTheme();
   const colorMode = React.useContext(ColorModeContext);
   const classes=useStyles()
   const {isSuccess}=useReportData()
   const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const location = useLocation();
// console.log(location.pathname);
    return (
        <Box sx={{bgcolor: "background.default"}} className={`${classes.container} ${trigger ? classes.shadow : ''}`}>
          <NavLink activeClassName='is-active'   className={classes.text} to="/"><img className={classes.logo} src={logo} alt=''/></NavLink> 
          <Box className={classes.subContainer}>
          <NavLink activeClassName='is-active'  style={({ isActive, isPending }) => {
    return {
      color: "black",
      // background:isActive?"#FFDAB9":"white" 
    };
  }}   className={classes.text} to="/"><Typography>HOME</Typography></NavLink>
                   
          {isSuccess&&
          <>
           <NavLink style={({ isActive, isPending }) => {
    return {
      color: "black",
      background:isActive?"#FFDAB9":"" ,
     
    };
  }}  className={classes.text} to="/json"><Typography>JSON</Typography></NavLink>
         {location.pathname=="/"&& <Scrollspy  className={classes.spyContainer}  items={ ['counter', 'pichart', 'trendchart',"grid"] } currentClassName={classes.current}>
                      <Link sx={{color: "text.primary"}}  className={classes.text} href="#counter"><Typography >COUNTER</Typography></Link>
                      <Link sx={{color: "text.primary"}}  className={classes.text} href="#pichart"><Typography>PICHART</Typography></Link>
                      <Link sx={{color: "text.primary"}}  className={classes.text} href="#trendchart"><Typography>TRENDCHART</Typography></Link>
                      <Link sx={{color: "text.primary"}}  className={classes.text} href="#grid"><Typography>GRID</Typography></Link>
                    </Scrollspy>}
                    </>
                    }
                   
                    <FileUpload/>
                  <IconButton
                      onClick={colorMode.toggleColorMode}
                      color="inherit"
                    >
                      {theme.palette.mode === "dark" ? (
                        <Brightness7Icon />
                      ) : (
                        <Brightness4Icon />
                      )}
                    </IconButton>
          </Box>
         </Box>
    );
};

export default Navigation;

const useStyles= makeStyles({
    container:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        padding:"0px 20px",
        position: "sticky",
        top: 0,
        zIndex:"10",
        marginBottom:"10px",
        // borderRadius:"5px",
        backgroundColor:"#FCD73C !important"
        // boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)',
    },
    logo:{
      width:"auto",
      height:"50px",
      objectFit: "cover"

    },
    subContainer:{
      display:"flex !important",
      alignItems:"center !important"
    },
    spyContainer:{
      display:"flex !important",
      // gap:"10px !important"
    },
    current:{
      background:"#0476B5 !important",
      color:"black !important",
    },
    shadow: {
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)',
    },
    text:{
      textDecoration:"none !important",
      color: "text.primary !important",
      padding:"5px 8px !important",
      borderRadius:"5px !important",
      marginRight:"5px !important",
      fontWeight:"700",
      fontSize:"16px !important"
    }
  })