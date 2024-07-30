// utils/formatDate.ts
export const formatDate = (date: Date, format: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
};
