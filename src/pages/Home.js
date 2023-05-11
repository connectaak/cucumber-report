
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { Fragment, useRef, useState } from 'react';
// import CompareTest from '../components/CompareTest';
import TableTest from '../components/TableTest';
// import Test from "../components/Test";
import CounterContainer from '../containers/CounterContainer';
import PichartContainer from '../containers/PichartContainer';
import TrendchartContainer from '../containers/TrendchartContainer';
import useReportData from '../hooks/useReportData';
const Home = () => {
  const { isSuccess,data } = useReportData();
  const classes = useStyles();
  const ref = useRef();

  const features=[
    <CounterContainer />,
    <PichartContainer />,
    <TrendchartContainer />,
    <TableTest />,
    // <Test/>,
    // <CompareTest data1={data}data2={data} />
  ]
  const [featuresItems, setfeaturesItems] = useState(features)

  const dragItem = useRef(null)
  const dragOverItem = useRef(null)

//const handle drag sorting
const handleSort = (e) => {
  //duplicate items
  let _featuresItems = [...featuresItems]

  //remove and save the dragged item content
  const draggedItemContent = _featuresItems.splice(dragItem.current, 1)[0]

  //switch the position
  _featuresItems.splice(dragOverItem.current, 0, draggedItemContent)

  //reset the position ref
  dragItem.current = null
  dragOverItem.current = null

  //update the actual array
  setfeaturesItems(_featuresItems)

  
  // auto-scroll when dragging near the top or bottom of the screen
  const scrollZoneHeight = 100 // number of pixels near the top/bottom to start scrolling
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const bottomScrollLimit = document.body.clientHeight - windowHeight - scrollZoneHeight

  if (e.clientY < scrollZoneHeight && scrollTop > 0) {
    window.scrollTo(0, scrollTop - 10)
  } else if (e.clientY > windowHeight - scrollZoneHeight && scrollTop < bottomScrollLimit) {
    window.scrollTo(0, scrollTop + 10)
  }
}
  const handlePdfExport = () => {
    html2canvas(ref.current, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', [ref.current.offsetWidth, ref.current.offsetHeight]);
      pdf.addImage(imgData, 'PNG', 0, 0, ref.current.offsetWidth, ref.current.offsetHeight);
      pdf.save('website-screen.pdf');
    });
  };

  return (
    <Fragment>
      {isSuccess ? (
        <div>
            <div className={classes.btnContainer}>
            <Button className={classes.btnBG} disableRipple onClick={handlePdfExport} variant="contained" component="span" endIcon={<DownloadIcon rounded />}>
              PDF
            </Button>
          </div>
          <div ref={ref} >
          {featuresItems.map((EventComp,index)=>{
                  return <div
                   key={EventComp.key}
                   className="mt-5"
                   draggable
                   onDragStart={(e)=>{dragItem.current=index}}
                   onDragEnter={(e)=>(dragOverItem.current=index)}
                   onDragEnd={handleSort}
                   onDragOver={(e)=>e.preventDefault()}>
                    {EventComp}
                  </div>
                })}
        
        
        </div>
        </div>
      ) : (
        <Box className={classes.container}>
          <Typography variant="h5" align="center">
            Please upload a cucumber json to see the report.
          </Typography>
        </Box>
      )}
    </Fragment>
  );
};

export default Home;

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '95vh',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'end',
    position: 'fixed',
    // top: '75px',
    bottom: '20px',
    left:'5px',
    width: '100%',
    margin: '10px 0',
    zIndex: '999',
  },
  btnBG: {
    background: '#0476B5 !important',
  },
});

// import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
// import { Box, Typography } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import { Fragment, useRef, useState } from 'react';
// import Pdf from 'react-to-pdf';
// import TableTest from '../components/TableTest';
// import CounterContainer from '../containers/CounterContainer';
// import PichartContainer from '../containers/PichartContainer';
// import TrendchartContainer from '../containers/TrendchartContainer';
// import useReportData from '../hooks/useReportData';

// const Home = () => {
//   const { isSuccess } = useReportData();
//   const classes = useStyles();
//   const ref = useRef();
//   const scrollRef = useRef();
//   const [featuresItems, setfeaturesItems] = useState([
//     <CounterContainer />,
//     <PichartContainer />,
//     <TrendchartContainer />,
//     <TableTest />
//   ]);
//   const dragItem = useRef(null);
//   const dragOverItem = useRef(null);
//   const scrollInterval = useRef(null);

//   const handleSort = () => {
//     let _featuresItems = [...featuresItems];
//     const draggedItemContent = _featuresItems.splice(dragItem.current, 1)[0];
//     _featuresItems.splice(dragOverItem.current, 0, draggedItemContent);
//     dragItem.current = null;
//     dragOverItem.current = null;
//     setfeaturesItems(_featuresItems);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     const container = scrollRef.current;
//     const scrollOffset = 10;
//     const topBound = container.offsetTop + scrollOffset;
//     const bottomBound = container.offsetTop + container.offsetHeight - scrollOffset;
//     const { clientY } = e;
//     const scrollSpeed = 5;

//     if (clientY < topBound) {
//       if (!scrollInterval.current) {
//         scrollInterval.current = setInterval(() => {
//           container.scrollTop -= scrollSpeed;
//         }, 10);
//       }
//     } else if (clientY > bottomBound) {
//       if (!scrollInterval.current) {
//         scrollInterval.current = setInterval(() => {
//           container.scrollTop += scrollSpeed;
//         }, 10);
//       }
//     } else {
//       clearInterval(scrollInterval.current);
//       scrollInterval.current = null;
//     }
//   };

//   return (
//     <Fragment>
//       {isSuccess ? (
//         <div>
//           <Pdf targetRef={ref} filename="code-example.pdf" scale={0.52} options={{ dpi: 600 }}>
//             {({ toPdf }) =><ArrowCircleDownIcon size={50} onClick={toPdf}/>}
//           </Pdf>
//           <div ref={ref} style={{ width: '100%', height: '100%' }}>
//             <div
//               ref={scrollRef}
//               style={{ height: '100%', overflowY: 'auto' }}
//               onDragOver={handleDragOver}
//             >
//               {featuresItems.map((EventComp,index)=>{
//                 return (
//                   <div
//                     key={index}
//                     className="mt-5"
//                     draggable
//                     onDragStart={(e)=>{dragItem.current=index}}
//                     onDragEnter={(e)=>{dragOverItem.current=index}}
//                     onDragEnd={handleSort}
//                   >
//                     {EventComp}
//                   </div>
//                 )
//               {'}'})}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <Box className={classes.container}>
//           <Typography variant="h5" align="center">
//             Please upload a cucumber json to see the report.
//           </Typography>
//         </Box>
//       )}
//     </Fragment>
//   );
// };

// export default Home;

// const useStyles = makeStyles({
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '95vh',
//   },
// });