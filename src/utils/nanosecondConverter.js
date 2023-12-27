import React from "react";

// const dateFns = require("date-fns");
export const NanosecondsConverter = ({ milliseconds }) => {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

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

  return <span>{`${hours}:${minutes}:${seconds}`}</span>;
};
