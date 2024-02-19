import { NanosecondsConverter } from "./nanosecondConverter";

export function getReportCompareGrid(previousReport, newReport) {
  const durationReport = [];

  // Iterate through each feature in the new report
  newReport.forEach((newFeature, index) => {
    // Find the corresponding feature in the previous report by name
    const previousFeature = previousReport.find(
      (feature) => feature.name === newFeature.name
    );

    // If the feature exists in both reports
    if (previousFeature) {
      // Calculate the total duration for the new feature
      const newFeatureDuration = newFeature.elements.reduce((acc, scenario) => {
        return (
          acc +
          scenario.steps.reduce(
            (acc, step) => acc + (step.result.duration || 0),
            0
          )
        );
      }, 0);

      // Calculate the total duration for the previous feature
      const previousFeatureDuration = previousFeature.elements.reduce(
        (acc, scenario) => {
          return (
            acc +
            scenario.steps.reduce(
              (acc, step) => acc + (step.result.duration || 0),
              0
            )
          );
        },
        0
      );

      // Calculate the difference in duration
      const durationDifference = newFeatureDuration - previousFeatureDuration;

      let status;
      if (previousFeatureDuration === null) {
        status = "None";
      } else if (newFeatureDuration > previousFeatureDuration) {
        status = "Failed";
      } else if (newFeatureDuration < previousFeatureDuration) {
        status = "Passed";
      } else {
        status = "No Change";
      }
      // Add the information to the report
      durationReport.push({
        featureId: index + 1, // Using the ID from the previous report
        featureName: previousFeature.name,
        previousDuration: NanosecondsConverter(previousFeatureDuration)
          .totalDuration,
        newDuration: NanosecondsConverter(newFeatureDuration).totalDuration,
        durationDifference: durationDifference,
        status: status,
      });
    }
  });

  return durationReport;
}
