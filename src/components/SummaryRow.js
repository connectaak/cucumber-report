import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const SummaryRow = ({data}) => {
    const classes = useStyles();
   
      const stepPassed=data.reduce((acc,curr)=>acc+curr.steps.passed,0);
        const stepFailed=data.reduce((acc,curr)=>acc+curr.steps.failed,0);
        const stepSkipped=data.reduce((acc,curr)=>acc+curr.steps.skipped,0);
        const stepPending=data.reduce((acc,curr)=>acc+curr.steps.pending,0);
        const stepUndefined=data.reduce((acc,curr)=>acc+curr.steps.undefined,0);
        const stepTotal=data.reduce((acc,curr)=>acc+curr.steps.total,0);
        const scenarioPassed=data.reduce((acc,curr)=>acc+curr.scenarios.passed,0);
        const scenarioFailed=data.reduce((acc,curr)=>acc+curr.scenarios.failed,0);
        const scenarioTotal=data.reduce((acc,curr)=>acc+curr.scenarios.total,0);
        const passedCount=data.reduce((acc,item)=>{
            return item.features.status==="passed"?acc+1:acc
        },0)
        const failedCount=data.reduce((acc,item)=>{
            return item.features.status==="failed"?acc+1:acc
        },0)
          
          const totalDurationMs = data.reduce((accumulator, currentValue) => {
            const [seconds, milliseconds] = currentValue.features.duration.split(" ");
            const durationMs = parseInt(seconds) * 1000 + parseInt(milliseconds);
            return accumulator + durationMs;
          }, 0);
          
        
    return (
      <>
        <Grid className={classes.borderLine} item xs={4}>
        <Typography className={classes.featureText}  > Summary </Typography>  
        </Grid>
        <Grid container item xs={4}>
       <Grid className={classes.borderLine} item xs={2} >  
        <Typography className={classes.text}  > {stepPassed}  </Typography>
        </Grid>

       <Grid className={classes.borderLine} item xs={2}  > 
        <Typography className={classes.text}  >{stepFailed}  </Typography> 
        </Grid>

       <Grid className={classes.borderLine} item xs={2} >  
        <Typography className={classes.text}  >{stepSkipped}  </Typography>   
        </Grid>

       <Grid className={classes.borderLine} item xs={2}>  
       <Typography className={classes.text}  > {stepPending} </Typography>   
        </Grid>

       <Grid className={classes.borderLine} item xs={2}  >  
       <Typography className={classes.text}  >{stepUndefined} </Typography> 
       </Grid>

       <Grid className={classes.borderLine} item xs={2}  >
         <Typography className={classes.text}  > {stepTotal} </Typography> 
        </Grid>

        </Grid>
        
        <Grid container item xs={2}>
        <Grid className={classes.borderLine} item xs={4} >   <Typography className={classes.text}  > {scenarioPassed} </Typography> </Grid>

       <Grid className={classes.borderLine} item xs={4} >  <Typography className={classes.text}  > {scenarioFailed}  </Typography> </Grid>

       <Grid className={classes.borderLine} item xs={4} >   <Typography className={classes.text}  > {scenarioTotal}  </Typography>     </Grid>
        </Grid>

        <Grid container item xs={2}>
        <Grid className={classes.borderLine} item xs={7} >   <Typography className={classes.text}  >{totalDurationMs/1000}s </Typography> </Grid>
       <Grid className={classes.borderLine} item xs={5}>  <Typography className={classes.text}  >
        {passedCount+"/"+failedCount}</Typography> </Grid>
        </Grid>
      </>
    );
};

const useStyles =makeStyles({
    borderLine:{
      border:"0.5px solid black !important",
      textAlign:"center"
    },
    featureText:{
        fontWeight:"bolder !important",
        fontSize:"14px !important",
        textAlign:"left !important",
        padding:"0px 10px !important",
    },
    text:{
        fontWeight:"bold !important",
        fontSize:"14px !important"
    }
  })
export default SummaryRow;