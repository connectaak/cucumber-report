import { NanosecondsConverter } from "./nanosecondConverter";

export const getTrendChartData = (data) => {
  let scenarios = [];
  let features = [];
  let steps = [];

  let featureNumber = 1;
  let scenarioNumber = 1;
  let stepNumber = 1;

  data?.forEach((feature) => {
    const featureName = `Feature ${featureNumber++}`;
    let featureStatus = "passed"; // default status is passed
    let featureDuration = 0;
    feature?.elements?.forEach((scenario) => {
      const scenarioName = `Scenario ${scenarioNumber++}`;
      let scenarioDuration = 0;
      let scenarioStatus = "passed"; // default status is passed
      scenario?.steps?.forEach((step) => {
        if (step?.result?.status !== "passed") {
          scenarioStatus = "failed"; // if any step is failed, scenario status is failed
        }
        scenarioDuration += step?.result?.duration || 0; // add duration to scenario duration
        steps.push({
          name: `Step ${stepNumber++}`,
          duration: NanosecondsConverter(step?.result?.duration || 0)
            .totalSeconds, // keep duration in original format (microseconds)
          scenarioName,
          featureName,
          status: step?.result?.status === "passed" ? "passed" : "failed", // if step passed, status is passed, else failed
        });
      });
      featureDuration += scenarioDuration;
      scenarios.push({
        name: scenarioName,
        duration: NanosecondsConverter(scenarioDuration).totalSeconds, // keep duration in original format (microseconds)
        featureName,
        status: scenarioStatus,
      });
      if (scenarioStatus === "failed") {
        featureStatus = "failed"; // if any scenario is failed, feature status is failed
      }
    });
    features.push({
      name: featureName,
      duration: NanosecondsConverter(featureDuration).totalSeconds, // keep duration in original format (microseconds)
      status: featureStatus,
    });
  });
  return {
    features,
    scenarios,
    steps,
  };
};
