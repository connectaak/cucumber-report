export const getCompareTable=(featuresData)=>{
    const subArrays = [];
    for (let i = 0; i < featuresData[0]?.length; i++) {
      const subArray = [];
      for (let j = 0; j < featuresData.length; j++) {
        const element = featuresData[j][i];
       const finalData= {
            name: element.feature,
            stepsPassed: element.stepPassed,
            stepsFailed: element.stepFailed,
            stepsSkipped: element.stepSkip,
            stepsUndefined: element.stepUndefined,
            stepsPending: element.stepPending,
            stepsTotal: element.stepTotal,
            scenariosPassed: element.scenariosPassed,
            scenariosFailed: element.scenariosFailed,
            scenariosTotal: element.scenariosTotal,
            duration: `${Math.floor(element.featureDuration / 1000000)}s`,
            status: element.featureStatus
        }
        subArray.push(finalData);
      }
      subArrays.push(subArray);
    }
  return subArrays 
}