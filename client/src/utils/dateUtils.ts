import { parseISO, format } from "date-fns";

export const formatDate = (dateString: string, option?: string): string => {
  const date = parseISO(dateString);

  let formatString = "M/d/yyyy";
  if (option === "verbose") formatString = "d MMMM yyyy";
  else if (option === "concise") formatString = "dd MMM, yyyy";

  return format(date, formatString);
};
