import { fechArtByText } from "../utils/api";
import { searchSchema } from "../constants/validation";

import { sortArray } from "../utils/sortUtil";
import * as yup from "yup";
import {
  fetchItems,
  updateFilteredItems,
  validateSearchQuery,
} from "../utils/searchUtils";

jest.mock("../../utils/api", () => ({
  fechArtByText: jest.fn(),
}));

jest.mock("../../utils/sortUtil", () => ({
  sortArray: jest.fn(),
}));

jest.mock("../../constants/validation", () => ({
  searchSchema: {
    validate: jest.fn(),
  },
}));

describe("searchUtils", () => {
  describe("fetchItems", () => {
    const setItems = jest.fn();
    const setErrorMsg = jest.fn();
    const setFilteredItems = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should fetch items and update state correctly", async () => {
      const mockData = [{ id: 1, title: "Art 1" }];
      (fechArtByText as jest.Mock).mockResolvedValue({ data: mockData });
      const debouncedQuery = "art";

      await fetchItems(
        debouncedQuery,
        setItems,
        setErrorMsg,
        "title",
        setFilteredItems,
      );

      expect(setErrorMsg).toHaveBeenCalledWith("");
      expect(fechArtByText).toHaveBeenCalledWith(debouncedQuery);
      expect(setItems).toHaveBeenCalledWith(mockData);
      expect(setFilteredItems).toHaveBeenCalled();
    });

    it("should handle errors during fetch", async () => {
      (fechArtByText as jest.Mock).mockRejectedValue(
        new Error("Network error"),
      );
      const debouncedQuery = "art";

      await fetchItems(
        debouncedQuery,
        setItems,
        setErrorMsg,
        "title",
        setFilteredItems,
      );

      expect(setErrorMsg).toHaveBeenCalledWith(
        "Error fetching data. Please try again.Error: Network error",
      );
    });
  });

  describe("updateFilteredItems", () => {
    const setFilteredItems = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should sort and set filtered items", () => {
      const data = [
        { id: 2, title: "Art 2" },
        { id: 1, title: "Art 1" },
      ];
      const sortedData = [
        { id: 1, title: "Art 1" },
        { id: 2, title: "Art 2" },
      ];
      (sortArray as jest.Mock).mockReturnValue(sortedData);

      updateFilteredItems(data, "title", setFilteredItems);

      expect(sortArray).toHaveBeenCalledWith(data, "title");
      expect(setFilteredItems).toHaveBeenCalledWith(sortedData);
    });
  });

  describe("validateSearchQuery", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should validate a valid query", async () => {
      (searchSchema.validate as jest.Mock).mockResolvedValue(true);
      const query = "valid query";

      const result = await validateSearchQuery(query);

      expect(result).toBe(true);
      expect(searchSchema.validate).toHaveBeenCalledWith({ search: query });
    });

    it("should throw an error for invalid query", async () => {
      const errorMessage = "Invalid query";
      (searchSchema.validate as jest.Mock).mockRejectedValue(
        new yup.ValidationError(errorMessage),
      );
      const query = "invalid query";

      await expect(validateSearchQuery(query)).rejects.toThrow(errorMessage);
    });

    it("should throw a generic error for unexpected issues", async () => {
      (searchSchema.validate as jest.Mock).mockRejectedValue(
        new Error("Unexpected error"),
      );
      const query = "unexpected query";

      await expect(validateSearchQuery(query)).rejects.toThrow(
        "An unexpected error occurred.",
      );
    });
  });
});
