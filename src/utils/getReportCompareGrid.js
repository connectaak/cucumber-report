import { NanosecondsConverter } from "./nanosecondConverter";

// export function getReportCompareGrid(data) {
//   let formattedRows = [];
//   let serialCounter = 1;
//   for (const entry of data) {
//     // Iterate over each data entry within the datetime
//     for (const rowData of entry.data) {
//       const id = rowData.featureId;
//       const name = rowData.featureName;
//       const reportName = rowData?.reportName;

//       const duration =
//         rowData.details.length > 0
//           ? rowData.details.reduce((acc, curr) => {
//               const durationValue = parseFloat(curr.stepResultDuration);
//               return isNaN(durationValue) ? acc : acc + durationValue;
//             }, 0)
//           : 0;

//       let row = formattedRows.find((item) => item.id === id);

//       // If the row for the ID does not exist, create it
//       if (!row) {
//         row = {
//           id: id,
//           Id: serialCounter++,
//           Feature_Name: name,
//         };
//         // Assign the value for the current date

//         formattedRows.push(row);
//       }

//       // Assign the value for the current date
//       row[`${reportName}-${entry.datetime}-duration`] =
//         NanosecondsConverter(duration).totalDuration;
//     }
//   }

//   return formattedRows;
// }

export function getReportCompareGrid(data) {
  const formattedRows = [];
  let serialCounter = 1;
  data.forEach((entry) => {
    entry.data.forEach((reportData) => {
      let row = formattedRows.find((row) => row.id === reportData.featureId);
      if (!row) {
        row = {
          id: reportData.featureId,
          Id: serialCounter++,
          Feature_Name: reportData.featureName,
        };
        formattedRows.push(row);
      }

      const duration =
        reportData.details.length > 0
          ? reportData.details.reduce((acc, curr) => {
              const durationValue = parseFloat(curr.stepResultDuration);
              return isNaN(durationValue) ? acc : acc + durationValue;
            }, 0)
          : 0;

      // Unique key for each report's duration based on its name and the entry datetime
      const durationKey = `${reportData.reportName}-${entry.datetime}-duration`;
      row[durationKey] = NanosecondsConverter(duration).totalDuration;
    });
  });
  return formattedRows;
}
