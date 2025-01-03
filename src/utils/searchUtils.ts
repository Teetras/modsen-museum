import * as yup from "yup";
import { fetchArtByText } from "../api/api";
import { sortArray } from "./sortUtil";
import { searchSchema } from "../constants/validation";
import { Artwork } from "../types/interfaces";

export const fetchItems = async (
  debouncedQuery: string,
  setItems: React.Dispatch<React.SetStateAction<Artwork[]>>,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
  sortField: keyof Artwork,
  setFilteredItems: React.Dispatch<React.SetStateAction<Artwork[]>>,
) => {
  try {
    setErrorMsg("");
    const response = await fetchArtByText(debouncedQuery);
    const data: Artwork[] = response.data;
    setItems(data);
    updateFilteredItems(data, sortField, setFilteredItems);
  } catch (error) {
    setErrorMsg("Error fetching data. Please try again." + error);
  }
};
export const updateFilteredItems = (
  data: Artwork[],
  sortKey: keyof Artwork,
  setFilteredItems: React.Dispatch<React.SetStateAction<Artwork[]>>,
) => {
  const sortedData = sortArray(data, sortKey);
  setFilteredItems(sortedData);
};

export const validateSearchQuery = async (query: string) => {
  try {
    await searchSchema.validate({ search: query });
    return true;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
export const handleSearch = async (
  debouncedQuery: string,
  sortField: keyof Artwork,
  setItems: React.Dispatch<React.SetStateAction<Artwork[]>>,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
  setFilteredItems: React.Dispatch<React.SetStateAction<Artwork[]>>,
) => {
  try {
    await validateSearchQuery(debouncedQuery);
    setErrorMsg("");
    await fetchItems(
      debouncedQuery,
      setItems,
      setErrorMsg,
      sortField,
      setFilteredItems,
    );
  } catch (error) {
    setFilteredItems([]);
    setErrorMsg(
      error instanceof Error ? error.message : "An unexpected error occurred.",
    );
  }
};

export const updateFilteredItemsList = (
  items: Artwork[],
  sortField: keyof Artwork,
  setFilteredItems: React.Dispatch<React.SetStateAction<Artwork[]>>,
) => {
  updateFilteredItems(items, sortField, setFilteredItems);
};
