import React from "react";

const FormattedDateTime = ({
  dateString,
  locale = "en-US",
  className,
  style,
}) => {
  if (!dateString) return null;

  const date = new Date(dateString);

  // Get day with ordinal suffix (1st, 2nd, 3rd, 4th, etc.)
  const day = date.getDate();
  const getDaySuffix = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Get month abbreviation
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  // Get year
  const year = date.getFullYear();

  const formattedDate = `${day}${getDaySuffix(day)} - ${month} - ${year}`;

  return <>{formattedDate}</>;
};

export default FormattedDateTime;
