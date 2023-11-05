import { parseISO, format, formatDistanceToNow } from "date-fns";

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
      formatString = "MMM d, yyyy '@' h:mma";
    } else {
      // For recent dates, we use the relative format, e.g., "x days ago"
      return `${formatDistanceToNow(date)} ago`;
    }
  }

  return format(date, formatString);
};
