import { fetchArtByText } from "../api/api";
import { searchSchema } from "../constants/validation";
import { sortArray } from "../utils/sortUtil";
import * as yup from "yup";
import {
  fetchItems,
  updateFilteredItems,
  validateSearchQuery,
} from "../utils/searchUtils";
import { Artwork } from "../types/interfaces";

jest.mock("../../utils/api", () => ({
  fetchArtByText: jest.fn(),
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
      const mockData: Artwork[] = [
        {
          id: 1,
          image_id: "1",
          title: "Art 1",
          artist_title: "",
          gallery_title: "",
          artist_display: "",
          dimensions: "",
          date_display: "",
          is_on_view: false,
          _score: 0,
          credit_line: "",
          place_of_origin: "",
        },
      ];
      (fetchArtByText as jest.Mock).mockResolvedValue({ data: mockData });
      const debouncedQuery = "art";

      await fetchItems(
        debouncedQuery,
        setItems,
        setErrorMsg,
        "title",
        setFilteredItems,
      );

      expect(setErrorMsg).toHaveBeenCalledWith("");
      expect(fetchArtByText).toHaveBeenCalledWith(debouncedQuery);
      expect(setItems).toHaveBeenCalledWith(mockData);
      expect(setFilteredItems).toHaveBeenCalled();
    });

    it("should handle errors during fetch", async () => {
      (fetchArtByText as jest.Mock).mockRejectedValue(
        new Error("Network error"),
      );
      const debouncedQuery = "art";

      await fetchItems(
        debouncedQuery,
        setItems,
        setErrorMsg,
        "title", // Используйте 'title' как ключ
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
      const data: Artwork[] = [
        {
          id: 2,
          image_id: "2",
          title: "Art 2",
          artist_title: "",
          gallery_title: "",
          artist_display: "",
          dimensions: "",
          date_display: "",
          is_on_view: false,
          _score: 0,
          credit_line: "",
          place_of_origin: "",
        },
        {
          id: 1,
          image_id: "1",
          title: "Art 1",
          artist_title: "",
          gallery_title: "",
          artist_display: "",
          dimensions: "",
          date_display: "",
          is_on_view: false,
          _score: 0,
          credit_line: "",
          place_of_origin: "",
        },
      ];
      const sortedData: Artwork[] = [
        {
          id: 1,
          image_id: "1",
          title: "Art 1",
          artist_title: "",
          gallery_title: "",
          artist_display: "",
          dimensions: "",
          date_display: "",
          is_on_view: false,
          _score: 0,
          credit_line: "",
          place_of_origin: "",
        },
        {
          id: 2,
          image_id: "2",
          title: "Art 2",
          artist_title: "",
          gallery_title: "",
          artist_display: "",
          dimensions: "",
          date_display: "",
          is_on_view: false,
          _score: 0,
          credit_line: "",
          place_of_origin: "",
        },
      ];
      (sortArray as jest.Mock).mockReturnValue(sortedData);

      updateFilteredItems(data, "title" as keyof Artwork, setFilteredItems); // Приведение типа

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
