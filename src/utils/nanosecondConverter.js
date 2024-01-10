// const dateFns = require("date-fns");
export const NanosecondsConverter = (milliseconds) => {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  // // Use differenceInHours
  // const hoursDifference = dateFns.differenceInHours(
  //   new Date(0),
  //   new Date(0).setHours(hours, minutes, seconds)
  // );

  // // Format the result
  // const formattedResult = dateFns.format(
  //   new Date(0).setHours(hoursDifference),
  //   "HH:mm:ss"
  // );

  // Format the result
  // const formattedResult = format(
  //   new Date(0).setHours(hours, minutes, seconds),
  //   "HH:mm:ss"
  // );

  return {
    totalDuration: `${hours}:${minutes}:${seconds}`,
    totalSeconds,
  };
};
export const getSecondsToDuration = (totalSeconds) => {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  // total minute
  const totalMinutes = Math.floor(totalSeconds / 60);

  // Calculate total hours
  const totalHours = Math.floor(totalSeconds / 3600);

  // Output the result
  return {
    totalDuration: `${hours}:${remainingMinutes}:${remainingSeconds}`,
    totalMinutes,
    totalHours,
  };
};
