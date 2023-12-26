import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const GridRow = ({data}) => {
    const classes = useStyles();
    const bgColors = {
        passed: "#89DE91",
        failed: "#F29387",
        skipped: "#88AAFF",
        pending: "#D7D7A3",
        undefined: "#E9BA77",
        total: "#D5D2D2",
      }
    return (
      <>
        <Grid className={classes.borderLine} item xs={4}>
        <Typography className={classes.featureText}  >  {data.name} </Typography>  
        </Grid>
        <Grid container item xs={4}>
       <Grid className={classes.borderLine} style={{background:!data.steps.passed==0&& bgColors.passed}}  item xs={2} >   <Typography className={classes.text}  > {data.steps.passed}  </Typography> </Grid>

       <Grid className={classes.borderLine} item xs={2} style={{background:!data.steps.failed==0&& bgColors.failed}} >  <Typography className={classes.text}  >{data.steps.failed}  </Typography>     </Grid>

       <Grid className={classes.borderLine} item xs={2} style={{background:!data.steps.skipped==0&& bgColors.skipped}} >   <Typography className={classes.text}  >{data.steps.skipped}  </Typography>     </Grid>

       <Grid className={classes.borderLine} item xs={2} style={{background:!data.steps.pending==0&& bgColors.pending}} >  <Typography className={classes.text}  > {data.steps.pending} </Typography>      </Grid>

       <Grid className={classes.borderLine} item xs={2} style={{background:!data.steps.undefined==0&& bgColors.undefined}} >  <Typography className={classes.text}  >{data.steps.undefined} </Typography>      </Grid>

       <Grid className={classes.borderLine} item xs={2} style={{background:!data.steps.total==0&& bgColors.total}} > <Typography className={classes.text}  > {data.steps.total} </Typography>       </Grid>
        </Grid>
        
        <Grid container item xs={2}>
        <Grid className={classes.borderLine} item xs={4} style={{background:!data.scenarios.passed==0&& bgColors.passed}} >   <Typography className={classes.text}  > {data.scenarios.passed} </Typography> </Grid>

       <Grid className={classes.borderLine} item xs={4} style={{background:!data.scenarios.failed==0&& bgColors.failed}}>  <Typography className={classes.text}  > {data.scenarios.failed}  </Typography> </Grid>

       <Grid className={classes.borderLine} item xs={4} style={{background:!data.scenarios.total==0&& bgColors.total}}>   <Typography className={classes.text}  > {data.scenarios.total}  </Typography>     </Grid>
        </Grid>

        <Grid container item xs={2}>
        <Grid className={classes.borderLine} item xs={7} >   <Typography className={classes.text}  >{data.features.duration}  </Typography> </Grid>
       <Grid className={classes.borderLine} item xs={5} style={{background:data.features.status=="Passed"?bgColors.passed:bgColors.failed}}>  <Typography className={classes.text}  >{data.features.status}</Typography> </Grid>
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
        fontWeight:"normal !important",
        fontSize:"14px !important",
        textAlign:"left !important",
        padding:"0px 10px !important",
       textDecoration:"underline !important",
       cursor:"pointer",
       
      
    },
    text:{
        fontWeight:"normal !important",
        fontSize:"14px !important"
    }
  })
export default GridRow;