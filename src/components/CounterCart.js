import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const CounterCart = ({title, value,time}) => {
    const classes=useStyles();

    return (
       <Box className={classes.mainContainer}>
            <Box className={classes.container} item xs={8}>
           <Typography  className={classes.text} >{value}</Typography>
          
           {time&&<Typography  className={classes.text} >{time}</Typography>}
           </Box>
            <Typography className={classes.btn}>{title}</Typography>
           
       </Box>
    );
};

export default CounterCart;
const useStyles =makeStyles({
    mainContainer:{
        width:"200px !important",
        border:"1px solid gray !important",
        borderRadius:"2px !important",
        margin:"10px !important",
    },
    container:{
     width:"100% !important",
     height:"100px !important",
     background:"#58DC58 !important",
     display:'flex !important',
    flexDirection:'column !important',
     alignItems:'center !important',
    justifyContent:'center !important',
    position:"relative !important",
    },
    text:{
        fontSize:"20px !important",
        fontWeight:"600 !important",
        color:"white !important",
        
    },
    btn:{
        textAlign:"center !important",
        fontSize:"18px !important",
        fontWeight:"500 !important",
        margin:"5px 0 !important",
    }
    })