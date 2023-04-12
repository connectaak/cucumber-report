import { makeStyles } from "@material-ui/styles";
import { Box } from '@mui/material';
const CustomTooltip = ({ active, payload, label }) => {
    const classes=useStyles();
    if (active && payload && payload.length) {  
      return (
        <Box className={classes.container}>
            {payload[0].payload.featureName&&
          <p className={classes.lebel}>{payload[0].payload.featureName}</p>}
            {payload[0].payload.scenarioName&&
          <p className={classes.lebel}>{payload[0].payload.scenarioName}</p>}
          <p className={classes.lebel}>{label}</p>
          <p className={classes.lebel}>Duration : {payload[0].value}</p>
        </Box>
      );
    }
}
export default CustomTooltip;

const useStyles = makeStyles({
    
container:{
    border:"1px solid #000",
    padding:"10px", 
},
lebel:{
    color:"black",
    fontSize:"16px",
    lineHeight:"16px",
}
})