export const cucumberCustomObject=(jsonData)=>{
    const featuresData = [];

jsonData.forEach(feature => {
  let stepPassed = 0;
  let stepFailed = 0;
  let stepSkip = 0;
  let stepPending = 0;
  let stepUndefined = 0;
  let scenariosPassed = 0;
  let scenariosFailed = 0;
  let featureDuration = 0;
  let featureStatus = "Passed";


  
  feature.elements.forEach(element => {
    element.steps.forEach(step => {
      switch (step.result.status) {
        case "passed":
          stepPassed++;
          break;
        case "failed":
          stepFailed++;
          break;
        case "skipped":
          stepSkip++;
          break;
        case "pending":
          stepPending++;
          break;
        case "undefined":
          stepUndefined++;
          break;
      }
    });

    if (element.steps.every(step => step.result.status === "passed")) {
      scenariosPassed++;
    } else  {
      scenariosFailed++;
      featureStatus = "Failed";
    }
  });

  featureDuration = feature.elements.reduce((total, element) => {
    return total + element.steps.reduce((total, step) => {
      return total + step.result.duration;
    }, 0);
  }, 0);

  featuresData.push({
    feature: feature.name,
    stepPassed: stepPassed,
    stepFailed: stepFailed,
    stepSkip: stepSkip,
    stepPending: stepPending,
    stepUndefined: stepUndefined,
    stepTotal: stepPassed + stepFailed + stepSkip + stepPending + stepUndefined,
    scenariosPassed: scenariosPassed,
    scenariosFailed: scenariosFailed,
    scenariosTotal: scenariosPassed + scenariosFailed,
    featureDuration: featureDuration,
    featureStatus: featureStatus
  });
});


const totalSteps= featuresData.reduce((accumulator, currentValue) => accumulator + currentValue?.stepTotal, 0)

const totalScenarios= featuresData.reduce((accumulator, currentValue) => accumulator + currentValue?.scenariosTotal, 0)

const totalDuration= featuresData.reduce((accumulator, currentValue) => accumulator + currentValue?.featureDuration, 0)

const counterData=[
  {title:"Features",value:featuresData.length},
  {title:"Scenarios",value:totalScenarios},
  {title:"Test/Steps",value: totalSteps},
  {title:"Duration",value:(Math.floor(totalDuration/1000000))+" "+"s"},
] 

const chartData = [
  {
    title:"Features",
    data: [
    {
      name: 'failed',
      value: featuresData.filter(item => item.featureStatus === 'Failed').length
    },
    {
      name: 'passed',
      value: featuresData.filter(item => item.featureStatus === 'Passed').length
    }
  ],
},

{ 
  title:"Scenarios",

   data: [
    {
      name: 'failed',
      value: featuresData.reduce((total, item) => total + item.scenariosFailed, 0)
    },
    {
      name: 'passed',
      value: featuresData.reduce((total, item) => total + item.scenariosPassed, 0)
    }
  ],
},

{
  title:"Steps",
data: [
    {
      name: 'failed',
      value: featuresData.reduce((total, item) => total + item.stepFailed, 0)
    },
    {
      name: 'passed',
      value: featuresData.reduce((total, item) => total + item.stepPassed, 0)
    },
    {
      name: 'skipped',
      value: featuresData.reduce((total, item) => total + item.stepSkip, 0)
    },
    {
      name: 'pending',
      value: featuresData.reduce((total, item) => total + item.stepPending, 0)
    },
    {
      name: 'undefined',
      value: featuresData.reduce((total, item) => total + item.stepUndefined, 0)
    },
  ]
}
]


const gridData = featuresData.map(item => {
  return {
      name: item.feature,
      stepsPassed: item.stepPassed,
      stepsFailed: item.stepFailed,
      stepsSkipped: item.stepSkip,
      stepsUndefined: item.stepUndefined,
      stepsPending: item.stepPending,
      stepsTotal: item.stepTotal,
      scenariosPassed: item.scenariosPassed,
      scenariosFailed: item.scenariosFailed,
      scenariosTotal: item.scenariosTotal,
      duration: `${Math.floor(item.featureDuration / 1000000)}s`,
      status: item.featureStatus
  }
});
const data = [
  {"name":"decaying","stepsPassed":2,"stepsFailed":1,"stepsSkipped":1,"stepsUndefined":0,"stepsPending":0,"stepsTotal":4,"scenariosPassed":1,"scenariosFailed":1,"scenariosTotal":2,"duration":"2s","status":"Failed"},
  {"name":"background","stepsPassed":4,"stepsFailed":0,"stepsSkipped":0,"stepsUndefined":0,"stepsPending":0,"stepsTotal":4,"scenariosPassed":2,"scenariosFailed":0,"scenariosTotal":2,"duration":"2s","status":"Passed"},
  {"name":"decayingbackground","stepsPassed":3,"stepsFailed":0,"stepsSkipped":1,"stepsUndefined":0,"stepsPending":0,"stepsTotal":4,"scenariosPassed":1,"scenariosFailed":1,"scenariosTotal":2,"duration":"2s","status":"Failed"}
];

// let totalStepsPassed = 0;
// let totalStepsFailed = 0;
// let totalStepsSkipped = 0;
// let totalStepsUndefined = 0;
// let totalStepsPending = 0;
// let totalStepsTotal = 0;
// let totalScenariosPassed = 0;
// let totalScenariosFailed = 0;
// let totalScenariosTotal = 0;

// for (let i = 0; i < data.length; i++) {
//   const item = data[i];
//   totalStepsPassed += item.stepsPassed;
//   totalStepsFailed += item.stepsFailed;
//   totalStepsSkipped += item.stepsSkipped;
//   totalStepsUndefined += item.stepsUndefined;
//   totalStepsPending += item.stepsPending;
//   totalStepsTotal += item.stepsTotal;
//   totalScenariosPassed += item.scenariosPassed;
//   totalScenariosFailed += item.scenariosFailed;
//   totalScenariosTotal += item.scenariosTotal;
// }
// console.log(JSON.stringify(gridData),"gridData")
// const gridSummary={totalStepsPassed,
//    totalStepsFailed ,
// totalStepsSkipped,
//   totalStepsUndefined,
//   totalStepsPending,
//   totalStepsTotal,
//   totalScenariosPassed, 
//   totalScenariosFailed,
//   totalScenariosTotal}

return {featuresData,chartData,counterData,gridData};
}