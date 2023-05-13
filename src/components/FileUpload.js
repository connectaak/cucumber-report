import { convert } from '@cucumber/cucumber-json-converter';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useLocation } from "react-router-dom";
import swal from 'sweetalert';
import useReportData from '../hooks/useReportData';
import { getComparisonData } from '../utils/getCompareData';
import { cucumberCustomObject } from '../utils/getCucumberCustomObj';

const FileUpload = () => {
  let location = useLocation();
  
    const {setData,data,setIsSuccess,
      setTotalReport,compareData,setCompareData,totalReport}=useReportData()
    

     
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader(); 
      reader.readAsText(file)
      reader.onload=readerEvent=>{
        
        try {
            // Try to run this code 
            const content = readerEvent.target.result;
            const cucumberJsonObject = convert(JSON.parse(content))
           if( location.pathname ==="/comparison"){
            const {featuresData}=getComparisonData(cucumberJsonObject.features)
            setCompareData([...compareData,...[featuresData]])
           }else{
            setData([...data,...cucumberJsonObject.features])
           }
            setIsSuccess(true);
            setTotalReport(totalReport+1)
           
            if(data.length>0){
              const {featuresData}= cucumberCustomObject(data)
          
            // if( hasCommonString(cucumberJsonObject,featuresData)){
            //   swal({
            //     title: "Are you sure?",
            //     text: "Once deleted, you will not be able to recover this imaginary file!",
            //     icon: "warning",
            //     buttons: true,
            //     dangerMode: true,
            //   })
            //   .then((willDelete) => {
            //     if (willDelete) {
            //       swal("Poof! Your imaginary file has been deleted!", {
            //         icon: "success",
            //       });
            //     } else {
            //       swal("Your imaginary file is safe!");
            //     }
            //   });
              
            // }
            }
          }
          catch(err) {
            // if any error, Code throws the error
            swal({
              title: "Oops",
              text: "Please upload a cucumber json file",
              icon: "warning",
              button: "ok",
            });
          }
       
        event.target.value = null;
      }
    }
    const classes=useStyles();
    return (
        <div >
        <input
          type="file"
          id="file"
          name="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={(event) => {
            handleFileUpload(event);
          }}
        />
        <label className={classes.btnContainer} htmlFor="file">
        <Button className={classes.btnBG}  variant="contained" component="span" endIcon={<UploadFileRoundedIcon rounded />}>
      <Typography sx={{ display: { xs: 'none', md: 'flex' }}}>
     { location.pathname ==="/comparison"?compareData.length>0?"Upload More Json":"Upload JSOn":data.length>0?"Upload More Json":"Upload json"}</Typography>

      <Typography sx={{  display: { xs: 'flex', md: 'none',m:0,p:"0" },}}></Typography>
        </Button>
        </label> 
    </div>
    );
};

export default FileUpload;


const useStyles =makeStyles({
btnContainer:{
  display:"flex",
  justifyContent:"center",
  margin:"10px 0"
},
  btnBG:{
background: "#0476B5 !important"
  }

})