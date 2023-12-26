export const getCompareChart=(featuresData)=>{

 const sortData=(data)=>{
    data.sort((a, b) => {
        if (a.status === "passed" && b.status === "failed") {
          return -1;
        } else if (a.status === "failed" && b.status === "passed") {
          return 1;
        } else {
          return 0;
        }
      });
      return data;
 }
const featureData= featuresData.map((features,index)=>

    {
        let data
        const failedlength= features.data.filter(item => item.featureStatus === 'Failed').length
      const passedlength=  features.data.filter(item => item.featureStatus === 'Passed').length
    
      if(passedlength>0&&failedlength>0){
       data=[{ name: features.name,
        status:"passed",
         value: passedlength},
         { name:  features.name,
        status:"failed",
         value: failedlength}]
        
      }
     else if(failedlength>0){
        data=[{ name:  features.name,
        status:"failed",
         value: failedlength}]
      }
    else if(passedlength>0){
        data=[{ name:  features.name,
        status:"passed",
         value: passedlength}]
      }
       return data
      },
    )
  
const ScenariosData=featuresData.map((features,index)=>{

    return[{
        name:  features.name ,
        status:"failed",
        value: features.data.reduce((total, item) => total + item.scenariosFailed, 0)
      },
      {
        name:  features.name,
        status:'passed',
        value: features.data.reduce((total, item) => total + item.scenariosPassed, 0)
      }]    
   }) 
const stepsData=featuresData.map((features,index)=>{

    return[{
        name: features.name ,
        status:"failed",
        value: features.data.reduce((total, item) => total + item.stepFailed, 0)
      },
      {
        name:  features.name,
        status:'passed',
        value: features.data.reduce((total, item) => total + item.stepPassed, 0)
      }]    
   }) 
  
   
    const chartData = [
        {
          title:"Features",
          data: sortData(featureData.flat())
      },
      
      { 
        title:"Scenarios",
      
         data:sortData( ScenariosData.flat())
      },
      
      {
        title:"Steps",
      data: sortData(stepsData.flat())
      }
      ]
 return chartData     
}