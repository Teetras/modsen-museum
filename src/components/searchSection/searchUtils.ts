import { fechArtByText } from "../../utils/api";
import { sortArray } from "../../utils/sortUtil";
import { searchSchema } from "../../constants/validation";
import * as yup from "yup";

export const fetchItems = async (
  debouncedQuery: string,
  setItems: React.Dispatch<React.SetStateAction<any[]>>,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
  sortField: string,
  setFilteredItems: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  try {
    setErrorMsg("");
    const response = await fechArtByText(debouncedQuery);
    const data = response.data;
    setItems(data);
    updateFilteredItems(data, sortField, setFilteredItems);
  } catch (error) {
    setErrorMsg("Error fetching data. Please try again." + error);
  }
};

export const updateFilteredItems = (
  data: any[],
  sortKey: string,
  setFilteredItems: React.Dispatch<React.SetStateAction<any[]>>,
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
