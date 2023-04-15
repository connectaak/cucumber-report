import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Box, Link, Typography } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Scrollspy from 'react-scrollspy';
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
    return (
        <Box className={`${classes.container} ${trigger ? classes.shadow : ''}`}>
          <FileUpload/>

       {isSuccess&& <Scrollspy  className={classes.spyContainer}  items={ ['counter', 'pichart', 'trendchart'] } currentClassName={classes.current}>
            <Link className={classes.text} href="#counter"><Typography >COUNTER</Typography></Link>
            <Link className={classes.text} href="#pichart"><Typography>PICHART</Typography></Link>
            <Link  className={classes.text} href="#trendchart"><Typography>TRENDCHART</Typography></Link>
          </Scrollspy>}
       
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
    );
};

export default Navigation;

const useStyles= makeStyles({
    container:{
        display:"flex",
        justifyContent:"space-between",
        padding:"10px 20px",
        // position: "-webkit-sticky", /* Safari */
        position: "sticky",
        top: 0,
        backgroundColor:"#58DC58",
        zIndex:"10",
        
    },
    spyContainer:{
      display:"flex !important",
      gap:"15px !important"
    },
    current:{
      background:"white !important",
      color:"white !important",
    },
    shadow: {
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)',
    },
    text:{
      textDecoration:"none !important",
      color:"black !important",
      padding:"5px 8px !important",
      borderRadius:"5px !important",
      fontWeight:"700",
      fontSize:"16px !important"
    }
  })