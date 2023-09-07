import { parseISO, format } from "date-fns";

export const convertDate = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, "d MMMM yyyy");
};
