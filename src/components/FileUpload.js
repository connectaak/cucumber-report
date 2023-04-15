import { convert } from '@cucumber/cucumber-json-converter';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import swal from 'sweetalert';
import JsonViewer from '../modals/JsonViewer';

const FileUpload = () => {
    const [cucumberJson, setCucumberJson] = useState({});
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader(); 
      reader.readAsText(file)
      reader.onload=readerEvent=>{
        
        try {
            // Try to run this code 
            const content = readerEvent.target.result;
            const cucumberJsonObject = convert(JSON.parse(content))
            if( typeof cucumberJsonObject === "object"){
              console.log(cucumberJson,"cucumber json")
                setCucumberJson(cucumberJsonObject)
                handleOpen()
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
        <Button  variant="contained" color="success" component="span" endIcon={<UploadFileRoundedIcon rounded />}>
        Upload json
        </Button>
        </label> 
        
        <JsonViewer open={open} handleClose={handleClose} handleOpen={handleOpen} cucumberJson={cucumberJson}/>
    </div>
    );
};

export default FileUpload;


const useStyles =makeStyles({
btnContainer:{
  display:"flex",
  justifyContent:"center",
  margin:"10px 0"
}
})