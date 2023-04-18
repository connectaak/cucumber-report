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
  {title:"Duration",value:(totalDuration/1000000)+" "+"sec"},
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
    steps: {
      passed: item.stepPassed,
      failed: item.stepFailed,
      skipped: item.stepSkip,
      undefined: item.stepUndefined,
      pending: item.stepPending,
      total: item.stepTotal
    },
    scenarios: {
      passed: item.scenariosPassed,
      failed: item.scenariosFailed,
      total: item.scenariosTotal
    },
    features: {
      duration: `${Math.floor(item.featureDuration / 1000)}s ${item.featureDuration % 1000}ms`,
      status: item.featureStatus
    }
  }
});


return {featuresData,chartData,counterData,gridData};
}