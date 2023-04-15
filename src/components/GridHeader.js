import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const GridHeader = () => {
    const classes = useStyles();
    return (
        <Grid className={classes.container} container>
         <Grid className={classes.borderLine} item xs={4}>
        </Grid>
        <Grid className={classes.borderLine} item xs={4}>
        <Typography className={classes.text}  > Steps  </Typography> 
        </Grid>
        <Grid className={classes.borderLine} item xs={2}>
        <Typography className={classes.text}  > Scenarios  </Typography>  
        </Grid>
        <Grid className={classes.borderLine} item xs={2}>
        <Typography className={classes.text}  > Features  </Typography> 
        </Grid>
        </Grid>
       

    );
};


const useStyles =makeStyles({
    container:{
        background:"#60CBF1"
    },
    borderLine:{
      border:"0.5px solid black",
      textAlign:"center"
    },
    text:{
        fontWeight:"bold !important",
        fontSize:"14px !important"
    }
  })
export default GridHeader;