import { NanosecondsConverter } from "./nanosecondConverter";

export function getGridHeatMapData(data) {
  let formattedRows = [];
  let serialCounter = 1;
  for (const entry of data) {
    // Iterate over each data entry within the datetime
    for (const rowData of entry.data) {
      const id = rowData.featureId;
      const name = rowData.featureName;
      const reportName = rowData?.reportName;

      const duration =
        rowData.details.length > 0
          ? rowData.details.reduce((acc, curr) => {
              const durationValue = parseFloat(curr.stepResultDuration);
              return isNaN(durationValue) ? acc : acc + durationValue;
            }, 0)
          : 0;

      let row = formattedRows.find((item) => item.id === id);

      // If the row for the ID does not exist, create it
      if (!row) {
        row = {
          id: id,
          Id: serialCounter++,
          Feature_Name: name,
        };
        formattedRows.push(row);
      }

      // Assign the value for the current date
      row[`${reportName}-${entry.datetime}-duration`] =
        NanosecondsConverter(duration).totalDuration;
    }
  }
  return formattedRows;
}
