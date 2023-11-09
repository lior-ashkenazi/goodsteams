import { parseISO, format, formatDistanceToNow, isEqual } from "date-fns";

export const formatDate = (dateString: string, option?: string): string => {
  const date = parseISO(dateString);

  let formatString = "M/d/yyyy";
  if (option === "verbose") formatString = "d MMMM yyyy";
  else if (option === "concise") formatString = "dd MMM, yyyy";
  else if (option === "discussions") {
    const now = new Date();

    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
    if (now.getTime() - date.getTime() > oneWeekInMs) {
      // For dates older than a week, we use the format "MMM d, yyyy @ h:mma"
      formatString =
        date.getFullYear() === now.getFullYear()
          ? "MMM d '@' h:mma"
          : "MMM d, yyyy '@' h:mma";
    } else {
      // For recent dates, we use the relative format, e.g., "x days ago"
      return `${formatDistanceToNow(date)} ago`;
    }
  }

  return format(date, formatString);
};

export const isEqualDates = (dateString1: string, dateString2: string) => {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  return isEqual(date1, date2);
};
