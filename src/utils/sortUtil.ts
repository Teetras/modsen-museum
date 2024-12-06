import { Artwork } from "../types/interfaces";

export const sortArray = (array: Artwork[], key: keyof Artwork) => {
  return [...array].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return 1;
    if (bValue === undefined) return -1;

    if (aValue === null && bValue === null) return 0;
    if (aValue === null) return 1;
    if (bValue === null) return -1;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue);
    }

    return String(aValue).localeCompare(String(bValue));
  });
};
