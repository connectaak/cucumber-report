import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
// import JSONViewer from 'react-json-viewer';
import ReactJson from 'react-json-view';
import useReportData from '../hooks/useReportData';
// import { cucumberCustomData } from '../utils/cucumberSecond';
const style={
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    height:"80%",
    bgcolor: 'background.paper',
    borderRadius:"10px",
    boxShadow: 24,
    p: 4,}

export default function JsonViewer({cucumberJson,handleClose,handleOpen,open}) {
  const {setData,setIsSuccess}=useReportData()
 const classes = useStyles();

 const handleSubmit=()=>{
    setData(cucumberJson)
    setIsSuccess(true);
    handleClose()
    // cucumberCustomData(cucumberJson)
  }
  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Box className={classes.jsonViewerContainer}>
        <ReactJson  src={cucumberJson} theme="monokai" />
        {/* <JSONViewer 
        json={cucumberJson}
      /> */}
    
        </Box>
        <Box className={classes.btn}>
        
        <Button variant='contained' color="success" onClick={handleSubmit
        }   >SUBMIT</Button>
      
        </Box>
        
        </Box>
      </Modal>
    </div>
  );
}

const useStyles =makeStyles({
   jsonViewerContainer:{
    width:"100%", 
    height:"90%", 
    overflowX:"scroll",
    overflowY:"scroll",
   },
   btn:{
    display:"flex", 
    justifyContent:"right", 
    margin:"20px 0",
    gap:"10px"
   }
})