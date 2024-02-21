import { NanosecondsConverter } from "./nanosecondConverter";

export function getReportCompareGrid(data) {
  // const durationReport = [];

  let formattedRows = [];

  // Iterate over each datetime entry
  for (const entry of data) {
    // Iterate over each data entry within the datetime
    for (const rowData of entry.data) {
      const id = rowData.featureId;
      const name = rowData.featureName;
      const duration = rowData.details.reduce(
        (acc, curr) => acc + curr.stepResultDuration,
        0
      );
      let row = formattedRows.find((item) => item.id === id);

      // If the row for the ID does not exist, create it
      if (!row) {
        row = {
          id: id,
          name: name,
        };
        formattedRows.push(row);
      }

      // Assign the value for the current date
      row[`date-${entry.datetime}`] =
        NanosecondsConverter(duration).totalDuration;
    }
  }

  return formattedRows;

  // Iterate over each datetime entry
  // for (let i = 0; i < data.length; i++) {
  //   const datetime = data[i].datetime;
  //   let singleRow = {
  //     // Id: firstIndexData.featureId + ", " + secondIndexData.featureId,
  //     // featureName:
  //     //   firstIndexData.featureName + ", " + secondIndexData.featureName,
  //     datetime,
  //   };
  //   for (let j = i; j < data[i].data.length; i++) {
  //     singleRow.Id = data[i].data[j].featureId;
  //   }
  //   // const firstIndexData = data[i].data[0]; // First index of the data array
  //   // const secondIndexData = data[i].data[1]; // Second index of the data array

  //   // Create a new row by concatenating the featureId and featureName from the first and second index

  //   // Push the concatenated row to the array
  //   allRows.push(singleRow);
  // }

  // return allRows;
  // Iterate through each JSON data object
  // jsonData?.forEach((data) => {
  // Iterate through each feature in the JSON data
  // data.data?.forEach((feature) => {
  //   // Initialize variables to store feature-level duration information
  //   let previousFeatureDuration = null;
  //   let newFeatureDuration = 0;
  //   // Iterate through each detail (scenario) in the feature
  //   feature.details?.forEach((detail) => {
  //     // Accumulate duration for the new feature
  //     newFeatureDuration += detail.stepResultDuration;
  //     // If there's a previous feature duration, accumulate it
  //     if (previousFeatureDuration !== null) {
  //       previousFeatureDuration += detail.stepResultDuration;
  //     }
  //   });
  //   // Add the feature information to the report
  //   durationReport.push({
  //     featureId: feature.featureId,
  //     featureName: feature.featureName,
  //     duration: newFeatureDuration,
  //     date: data.datetime,
  //   });
  // });
  // });

  // return durationReport;
}

//   const durationReport = [];

//   // Iterate through each feature in the new report
//   newReport.forEach((newFeature, index) => {
//     // Find the corresponding feature in the previous report by name
//     const previousFeature = previousReport.find(
//       (feature) => feature.featureId === newFeature.featureId
//     );

//     // If the feature exists in both reports
//     if (previousFeature) {
//       // Calculate the total duration for the new feature
//       const newFeatureDuration = newFeature.reduce((acc, scenario) => {
//         return (
//           acc +
//           scenario.steps.reduce(
//             (acc, step) => acc + (step.stepResultDuration || 0),
//             0
//           )
//         );
//       }, 0);

//       // Calculate the total duration for the previous feature
//       const previousFeatureDuration = previousFeature.reduce(
//         (acc, scenario) => {
//           return (
//             acc +
//             scenario.steps.reduce(
//               (acc, step) => acc + (step.stepResultDuration || 0),
//               0
//             )
//           );
//         },
//         0
//       );

//       // Calculate the difference in duration
//       const durationDifference = newFeatureDuration - previousFeatureDuration;

//       let status;
//       if (previousFeatureDuration === null) {
//         status = "None";
//       } else if (newFeatureDuration > previousFeatureDuration) {
//         status = "Failed";
//       } else if (newFeatureDuration < previousFeatureDuration) {
//         status = "Passed";
//       } else {
//         status = "No Change";
//       }
//       // Add the information to the report
//       durationReport.push({
//         featureId: index + 1, // Using the ID from the previous report
//         featureName: previousFeature.featureName,
//         previousDuration: NanosecondsConverter(previousFeatureDuration)
//           .totalDuration,
//         newDuration: NanosecondsConverter(newFeatureDuration).totalDuration,
//         durationDifference: durationDifference,
//         status: status,
//       });
//     }
//   });

//   return durationReport;
// }
