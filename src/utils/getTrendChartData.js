export const getTrendChartData=(data)=>{
    let scenarios = [];
  let features = [];
  let steps = [];

  let featureNumber = 1;
  let scenarioNumber = 1;
  let stepNumber = 1;

    data?.forEach((feature) => {
        const featureName = `Feature ${featureNumber++}`;
        let featurePassedDuration = 0;
        let featureFailedDuration = 0;
        feature?.elements?.forEach((scenario) => {
          const scenarioName = `Scenario ${scenarioNumber++}`;
          let scenarioPassedDuration = 0;
          let scenarioFailedDuration = 0;
          let scenarioStatus = 'failed'; // default status is failed
          scenario?.steps?.forEach((step) => {
            if (step?.result?.status === 'passed') {
              scenarioPassedDuration += step?.result?.duration || 0; // add duration to passedDuration
              scenarioStatus = 'passed'; // if any step passed, scenario status will be passed
            } else if (step?.result?.status === 'failed' || step?.result?.status === 'undefined' || step?.result?.status === 'skipped') {
              scenarioFailedDuration += step?.result?.duration || 0; // add duration to failedDuration
            }
          });
          const scenarioDuration = scenarioPassedDuration + scenarioFailedDuration;
          const passedDuration = scenarioStatus === 'passed' ? scenarioDuration / 1000000 : 0;
          const failedDuration = scenarioStatus !== 'passed' ? scenarioDuration / 1000000 : 0;
          scenarios.push({
            name: scenarioName,
            duration: scenarioDuration / 1000000,
            featureName,
            status: scenarioStatus,
            passedDuration,
            failedDuration
          });
          featurePassedDuration += passedDuration;
          featureFailedDuration += failedDuration;
          steps.push(
            ...scenario?.steps?.map((step) => {
              const stepPassedDuration = step?.result?.status === 'passed' ? step?.result?.duration || 0 : 0;
              const stepFailedDuration = step?.result?.status !== 'passed' ? step?.result?.duration || 0 : 0;
              const stepDuration = stepPassedDuration + stepFailedDuration;
              const stepPassed = step?.result?.status === 'passed';
              return {
                name: `Step ${stepNumber++}`,
                duration: stepDuration / 1000000,
                scenarioName,
                featureName,
                status: stepPassed ? 'passed' : 'failed', // if step passed, status is passed, else failed
                passedDuration: stepPassed ? stepDuration / 1000000 : 0,
                failedDuration: stepPassed ? 0 : stepDuration / 1000000
              };
            })
          );
        });
        const featureDuration = (featurePassedDuration + featureFailedDuration) * 1000000;
        const featurePassed = featureFailedDuration === 0;
        features.push({
          name: featureName,
          duration: featureDuration / 1000000,
          status: featurePassed ? 'passed' : 'failed',
          passedDuration: featurePassed ? featureDuration / 1000000 : 0,
          failedDuration: featurePassed ? 0 : featureDuration / 1000000
        });
      });
console.log({scenarios, features,steps},"getttt")
      return {scenarios, features,steps}
}