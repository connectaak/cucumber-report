import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from '@mui/material';
import React from 'react';

const PichartFooter = ({title,value,color}) => {
    const classes=useStyles(color);
    return (
        <Box style={{border:`1px solid ${color}`}} className={classes.container}>
            <Typography style={{backgroundColor:color}} className={classes.firstSection}>{value}%</Typography>
            <Typography style={{color:color}} className={classes.secondSection}>{title}</Typography>
        </Box>
    );
};

export default PichartFooter;

const useStyles = makeStyles({
    
container:{
    // border:({color})=>`1px solid ${color} !important`,
    display:"flex !important",
    width:"32% !important"
},
firstSection:{
    // backgroundColor:`${props.color} !important`,
  
    padding:"2px 2px",
    color:"white",
    width:"30%",
    fontSize:"16px ",
},
secondSection:{
    textAlign:"center !important",
    backgroundColor:"white !important",
   width:"70%",
    padding:"2px !important",
    // color:(props)=>props.color,
    fontSize:"16px !important",
}
});